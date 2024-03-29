/**
 * soft-delete hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */

const addDeletedAtToCriteria = (criteria, deletedAt, pk) => {
  if (!criteria) {
    criteria = {};
  } else if (typeof criteria !== "object" && pk) {
    criteria = { [pk]: criteria };
  }

  (criteria.where || criteria).deletedAt = deletedAt;

  return criteria;
};

module.exports = function defineSoftDeleteHook(sails) {
  let hook;

  return {
    /**
     * Runs when this Sails app loads/lifts.
     */
    initialize: function (cb) {
      sails.log.info("Initializing hook (`softDelete`)");

      hook = this;

      if (!sails.hooks.orm) {
        sails.log.warn(
          "ORM hook is disabled. Soft Delete can't work without ORM hook"
        );
        return cb();
      }

      sails.after("hook:orm:loaded", () => {
        this._configureModels();
        cb();
      });
    },

    _configureModels() {
      const defaultArchiveInUse = Object.keys(sails.models).some(
        (modelIdentity) => {
          const Model = sails.models[modelIdentity];
          return Model.archiveModelIdentity === "archive";
        }
      );

      Object.keys(sails.models).forEach((modelIdentity) => {
        const Model = sails.models[modelIdentity];

        if (
          (modelIdentity === "archive" && defaultArchiveInUse) ||
          modelIdentity.indexOf("__") !== -1
        ) {
          return;
        }

        this._configureModel(Model, modelIdentity);
      });
    },

    _configureModel(Model) {
      // Add deletedAt attribute to model
      if (!Model.attributes.deletedAt) {
        Model.attributes.deletedAt = {
          type: "string",
          allowNull: true,
          columnType: "timestamp",
          required: false,
          defaultsTo: null,
        };
      }

      const { find, findOne, destroy, destroyOne, update, updateOne } = Model;

      /**
       * Overwrite find to add { deletedAt: null } to criteria
       */
      Model.find = function (criteria = {}, populate) {
        criteria = addDeletedAtToCriteria(criteria, null);

        const associationFields = Model.associations.map((a) => a.alias);

        return find.call(this, criteria, populate);
      };

      /**
       * New function to find only trashed records
       */
      Model.findTrashed = function (criteria) {
        criteria = addDeletedAtToCriteria(criteria, { "!=": null });
        return find.call(this, criteria);
      };

      /**
       * Overwrite the default destroy to just update matched records
       * By setting deletedAt to current timestamp
       */
      Model.destroy = function (criteria) {
        const where = { ...criteria, deletedAt: null };

        // console.log({ where });

        return update.call(this, where, { deletedAt: new Date() });
      };

      /**
       * Overwrite the default destroyOne to just update the record
       * By setting deletedAt to current timestamp
       */
      Model.destroyOne = function (criteria) {
        const where = { ...criteria, deletedAt: null };

        // console.log({ where });

        return updateOne.call(this, where, { deletedAt: new Date() });
      };

      /**
       * Original destroy, destroyOne
       */
      Model.forceDestroy = destroy.bind(Model);
      Model.forceDestroyOne = destroyOne.bind(Model);

      /**
       * Restore matched records. Aka set deletedAt to null
       */
      Model.restore = function (criteria) {
        return update.call(this, criteria, { deletedAt: null });
      };

      /**
       * Restore matched record.
       */
      Model.restoreOne = function (criteria) {
        return updateOne.call(this, criteria, { deletedAt: null });
      };
    },
  };
};
