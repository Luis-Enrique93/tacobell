/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const {
  GUATEMALA_PHONE_REGEX,
  BASIC_STATUS,
  ACTIVE_STATUS,
} = require("../../constants");
const { S3_BASEURL } = process.env;

module.exports = {
  attributes: {
    name: {
      type: "string",
      required: true,
    },
    lastname: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      isEmail: true,
      allowNull: true,
    },
    dpi: {
      type: "string",
      // TODO: Añadir validación regex
    },
    phone: {
      type: "string",
      //TODO: Añadir regex para guatemala y el salvador
      regex: GUATEMALA_PHONE_REGEX,
    },
    password: {
      type: "string",
      required: true,
    },
    role: {
      model: "role",
      required: true,
    },
    branch: {
      model: "branch",
    },
    company: {
      model: "company",
    },
    avatar: {
      type: "string",
      isURL: true,
      allowNull: true,
    },
    confirmed: {
      type: "boolean",
      defaultsTo: false,
    },
    acceptTermsAndConditions: {
      type: "boolean",
      allowNull: true,
    },
    emailToken: {
      type: "string",
      allowNull: true,
    },
    emailTokenExpiresAt: {
      columnType: "timestamp",
      type: "string",
      allowNull: true,
    },
    emailVerifiedAt: {
      columnType: "timestamp",
      type: "string",
      allowNull: true,
    },
    // Para cambiar contraseña cuando la han olvidado
    passwordResetToken: {
      type: "string",
      description:
        "A unique token used to verify the user's identity when recovering a password.",
      allowNull: true,
    },
    passwordResetTokenExpiresAt: {
      type: "string",
      columnType: "timestamp",
      description:
        "A timestamp representing the moment when this user's `passwordResetToken` will expire (or 0 if the user currently has no such token).",
      allowNull: true,
    },
    status: {
      type: "string",
      isIn: [...BASIC_STATUS, "Bloqueado"],
      defaultsTo: ACTIVE_STATUS,
    },
  },

  beforeCreate: async function (valuesToSet, proceed) {
    try {
      // Si hay email lo paso a lowercase
      if (valuesToSet.email) {
        valuesToSet.email = valuesToSet.email?.toLowerCase().trim();
      }

      // Hasheo la contraseña
      if (valuesToSet.password) {
        const hashedPassword = await sails.helpers.passwords.hashPassword(
          valuesToSet.password
        );

        valuesToSet.password = hashedPassword;
        if (valuesToSet.email != null) {
          valuesToSet.email = valuesToSet.email.toLowerCase();
        }
      }
    } catch (error) {
      return proceed(error);
    }
    return proceed();
  },

  beforeUpdate: async function (valuesToSet, proceed) {
    delete valuesToSet.role;
    if (valuesToSet.hasOwnProperty("password")) {
      try {
        const hashedPassword = await sails.helpers.passwords.hashPassword(
          valuesToSet.password
        );

        valuesToSet.password = hashedPassword;
      } catch (error) {
        return proceed(error);
      }
    }

    return proceed();
  },

  customToJSON: function () {
    if (this.avatar && !this.avatar.includes(S3_BASEURL)) {
      this.avatar = `${S3_BASEURL}${this.avatar}`;
    }

    // Return a shallow copy of this record with the password and ssn removed.
    return _.omit(this, [
      "password",
      "emailToken",
      "passwordResetToken",
      "emailTokenExpiresAt",
      "passwordResetTokenExpiresAt",
    ]);
  },
};
