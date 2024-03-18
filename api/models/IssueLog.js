/**
 * IssueLog.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const { ALLOWED_ISSUE_TYPES } = require("../../constants");

module.exports = {
  attributes: {
    content: {
      // Es el campo description de IssueOption
      type: "string",
      required: true,
    },
    evidence: {
      // URL de la imagen del bucket de s3, primero se sube la imagen luego se envía la URL
      type: "string",
      isURL: true,
      allowNull: true,
    },
    comment: {
      type: "string",
    },
    type: {
      type: "string",
      isIn: ALLOWED_ISSUE_TYPES,
    },
    order: {
      model: "order",
    },
  },
};
