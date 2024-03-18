const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = {
  friendlyName: "Generate new jwt token",

  description: "",

  inputs: {
    subject: {
      type: "string",
      required: true,
    },
    expiresIn: {
      type: "string",
      required: false,
      defaultsTo: "14d",
    },
    type: {
      type: "string",
      defaultsTo: "email",
      isIn: ["email", "dpi"],
    },
  },

  exits: {},

  fn: async function (inputs) {
    const { subject: sub, expiresIn, type } = inputs;

    const payload = {
      iss: "Carwash API",
      sub,
      type,
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn });
  },
};
