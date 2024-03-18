/**
 * Order.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const moment = require("moment-timezone");

module.exports = {
  attributes: {
    clientFullName: {
      type: "string",
      defaultsTo: "CONSUMIDOR FINAL",
    },
    clientPhone: {
      type: "string",
      allowNull: true,
    },
    address: {
      type: "string",
      required: true,
    },
    addressCoordinate: {
      type: "json",
      required: true,
      custom: Array.isArray,
    },
    totalAmount: {
      type: "number",
      min: 0,
    },
    creationDate: {
      type: "string",
      required: true,
    },
    //! PARA ENTREGAS PROGRAMADAS
    deliveryDate: {
      type: "string",
      allowNull: true,
    },
    // Uber, Pedidos Ya, etc
    deliveryService: {
      model: "deliveryService",
    },
    paymentMethodType: {
      type: "string",
      isIn: ["POS", "Efectivo", "Card"],
      required: true,
    },
    branch: {
      model: "branch",
      required: true,
    },
    code: {
      type: "string",
      unique: true,
      required: true,
    },
    status: {
      type: "string",
      required: true,
    },
    saleChannel: {
      model: "saleChannel",
      required: true,
    },
    assignedDriver: {
      model: "deliveryDriver",
    },
    products: {
      type: "json",
      custom: Array.isArray,
    },
    statusHistory: {
      type: "json",
      custom: Array.isArray,
      defaultsTo: [],
    },
    // Aquí se guardarán las rutas que va tomando un conductor cada x tiempo para posteriormente reconstruir el camino
    routes: {
      type: "json",
      custom: Array.isArray,
      defaultsTo: [],
    },
  },
};
