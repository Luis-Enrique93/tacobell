/**
 * Branch.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const { REGEX_HH_MM, REGEX_HEX_COLOR } = require("../../constants");

module.exports = {
  attributes: {
    // Código dentro del sistema de tacobell (integración)
    branchId: {
      type: "string",
      required: true,
    },
    name: {
      type: "string",
      unique: true,
    },
    description: {
      type: "string",
      allowNull: true,
    },
    contact: {
      type: "string",
      allowNull: true,
    },
    phone: {
      type: "string",
      allowNull: true,
    },
    address: {
      type: "string",
      allowNull: true,
    },
    color: {
      type: "string",
      custom: REGEX_HEX_COLOR.test,
    },
    minAmount: {
      type: "number",
      min: 0,
      defaultsTo: 0,
    },
    geofence: {
      type: "json",
      // Valido Polígono geográfico: Array de arrays [[lat, long], [lat, long], ...]
      custom: (value) =>
        Array.isArray(value) && !value.find((el) => Array.isArray(el)),
    },
    timeout: {
      type: "string",
      custom: REGEX_HH_MM.test,
      allowNull: true,
    },
    // TODO: Preguntar para qué sirve el límite de órdenes (motorista)
    ordersLimit: {
      type: "number",
      min: 1,
    },
  },
};
