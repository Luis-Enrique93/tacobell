const { HTTP_METHODS_DICTIONARY } = require("../../constants");

module.exports = async function (req, res, next) {
  const type = HTTP_METHODS_DICTIONARY[req.method] || null;

  // Los campos createdBy no se deben editar
  if (type === "Escritura" || type === "Edición") {
    if (!req.body) {
      req.body = {};
    }
    req.body.createdBy = undefined;
  }

  sails.helpers.verifyJwt
    .with({
      req: req,
      res: res,
    })
    .switch({
      error: function (error) {
        return res
          .status(500)
          .json({ customMessage: "Algo salió mal", details: error.message });
      },
      invalid: function (error) {
        // if this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
        // send a 401 response letting the user agent know they need to login to
        // access this endpoint.
        if (req.wantsJSON) {
          return res.status(401).json({ customMessage: "Acceso restringido" });
        }
        // otherwise if this is an HTML-wanting browser, do a redirect.
        // return res.redirect('/login')
      },
      success: function () {
        // user has been attached to the req object (ie logged in) so we're set, they may proceed
        return next();
      },
    });
};
