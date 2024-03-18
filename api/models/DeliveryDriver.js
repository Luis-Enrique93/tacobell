/**
 * DeliveryDriver.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const { DRIVER_STATUSES } = require("../../constants");

module.exports = {
  attributes: {
    deliveryService: {
      model: "deliveryService",
      required: true,
    },
    status: {
      type: "string",
      required: true,
      isIn: DRIVER_STATUSES,
    },
    user: {
      model: "user",
      required: true,
    },
  },
};
