/**
 * example.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.example();
 *     // -or-
 *     return res.example(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'example'
 *       }
 *     }
 * ```
 *
 * ```
 *     throw 'somethingHappened';
 *     // -or-
 *     throw { somethingHappened: optionalData }
 * ```
 */

const { isLiteralObject } = require("../../utils");

module.exports = function example(optionalData) {
  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  // Define the status code to send in the response.
  res.status(404);

  // Cuando se usa manualmente esta respuesta, se debe enviar el body definido
  if (optionalData) {
    if (isLiteralObject(optionalData)) {
      return res.json(optionalData);
    } else {
      return res.json({ error: optionalData });
    }
  }

  // Por defecto, se envía el mensaje predeterminado
  return res.json({
    customMessage: "Recurso no encontrado",
  });
};
