module.exports = function (req, res, next) {
  const originalServerError = res.serverError;
  const originalBadRequest = res.badRequest;
  const originalJson = res.json;
  const originalNotFound = res.notFound;

  res.serverError = function (data) {
    const customResponse = {
      customMessage: "Algo salió mal",
    };

    res.responseSent = data;

    originalServerError(customResponse);
  };

  res.badRequest = function (data) {
    res.responseSent = data;
    originalBadRequest.call(this, data);
  };

  res.json = function (data) {
    res.responseSent = data;

    originalJson.call(this, data);
  };

  res.notFound = function (data) {
    res.responseSent = data;
    originalNotFound.call(this, data);
  };

  next();
};
