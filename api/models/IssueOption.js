/**
 * IssueOption.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const {
  ALLOWED_ISSUE_TYPES,
  BASIC_STATUS,
  ACTIVE_STATUS,
} = require("../../constants");

// Estas son las opciones que tiene el motorista para enviar al IssueLog, se enviaría el string del campo description
module.exports = {
  attributes: {
    description: {
      type: "string",
      required: true,
    },
    uploadImage: {
      type: "boolean",
      required: true,
    },
    status: {
      type: "string",
      isIn: BASIC_STATUS,
      defaultsTo: ACTIVE_STATUS,
    },
    type: {
      type: "String",
      isIn: ALLOWED_ISSUE_TYPES,
    },
  },
};
