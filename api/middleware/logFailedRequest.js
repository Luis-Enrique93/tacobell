module.exports = function (req, res, next) {
  try {
    if (!res || !res.statusCode) {
      return next();
    }

    // Filtramos las solicitudes que provienen de direcciones IP internas o de rangos de IP específicos que no corresponden a clientes externos
    const internalIPs = [/^10\./, /^172\.(1[6-9]|2\d|3[01])\./, /^192\.168\./];

    const isInternalIP = internalIPs.some((regex) =>
      regex.test(req.connection.remoteAddress)
    );

    if (isInternalIP) {
      return next();
    }

    res.on("finish", function () {
      // console.log("ME", req.me);
      // console.log("ID", req.me?.id);
      // console.log(res.responseSent);

      if (res.statusCode >= 400) {
        // Creamos un documento en MongoDB con información sobre la solicitud fallida
        const failedRequest = {
          url: req.url,
          method: req.method,
          params: req.allParams && req.allParams(),
          body: req.body ? JSON.stringify(req.body) : null,
          // headers: { ...req.headers, Authorization: null, authorization: null },
          status: res.statusCode,
          error: res.responseSent ? JSON.stringify(res.responseSent) : null,
          // Si es usuario, pq las paystations también tienen un req.me
          user: req?.me?.id && req.me?.role ? req.me?.id : null,
        };

        sails.models["failedrequest"].create(failedRequest, function (err) {
          if (err) {
            console.error(
              "Error al guardar la solicitud fallida en la base de datos:",
              err
            );
          }
        });
      }
    });

    next();
  } catch (error) {
    console.log({ error });
  }
};
