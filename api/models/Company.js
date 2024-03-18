/**
 * Company.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const { REGEX_HEX_COLOR, REGEX_HH_MM } = require("../../constants");
const { isLiteralObject } = require("../../utils");

module.exports = {
  attributes: {
    name: {
      type: "string",
      required: true,
      unique: true,
    },
    description: {
      type: "string",
      allowNull: true,
    },
    logo: {
      type: "string",
      isURL: true,
    },
    // Id de integración con sistema tacobell
    companyId: {
      type: "string",
      unique: true,
      required: true,
    },
    NIT: {
      type: "string",
      allowNull: true,
    },
    callCenterPhone: {
      type: "string",
      // TODO: Añadir validacion
    },
    iva: {
      type: "number",
      min: 0,
      max: 100,
    },
    colors: {
      type: "json",
      custom: (value) => {
        if (!isLiteralObject(value)) {
          return false; // No es un obj
        }

        const expectedKeys = [
          "menu",
          "background",
          "buttons",
          "font",
          "header",
        ];
        const objectKeys = Object.keys(value);

        if (objectKeys.length !== expectedKeys.length) {
          return false; // El objeto tiene un número incorrecto de propiedades
        }

        for (const key of objectKeys) {
          if (
            !expectedKeys.includes(key) ||
            // También el value debe ser un color hexadecimal
            !REGEX_HEX_COLOR.test(value[key])
          ) {
            return false; // El objeto contiene una propiedad inesperada
          }
        }

        return true; // El objeto cumple con los requisitos
      },
      // { menu, background, buttons, font, header }
    },
    deliverySchedule: {
      type: "json",
      custom: (value) => {
        if (!isLiteralObject(value)) {
          return false; // No es objecto
        }

        const expectedKeys = ["openingTime", "closingTime"];
        const objectKeys = Object.keys(value);

        if (objectKeys.length !== expectedKeys.length) {
          return false; // El objeto tiene un número incorrecto de propiedades
        }

        for (const key of objectKeys) {
          if (
            !expectedKeys.includes(key) ||
            // También el value debe estar en formato HH:MM
            !REGEX_HH_MM.test(value[key])
          ) {
            return false; // El objeto contiene una propiedad inesperada
          }
        }

        return true; // El objeto cumple con los requisitos
      },
      // {openingTime, closingTime }
    },
  },
};
