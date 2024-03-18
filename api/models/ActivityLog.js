/**
 * ActivityLog.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    startDate: {
      type: "string",
      required: true,
    },
    endDate: {
      type: "string",
      required: true,
    },
    deliveryDriver: {
      model: "deliveryDriver",
      required: true,
    },
  },
};
