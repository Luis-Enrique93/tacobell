/**
 * FailedRequest.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    url: {
      type: "string",
      allowNull: true,
    },
    method: {
      type: "string",
      allowNull: true,
    },
    params: {
      type: "json",
    },
    body: {
      type: "string",
      allowNull: true,
    },
    status: {
      type: "string",
      allowNull: true,
    },
    error: {
      type: "string",
      allowNull: true,
    },
    user: {
      model: "user",
    },
  },
};
