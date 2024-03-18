module.exports = async function (req, res, next) {
  // Añade en el body el createdBy que será el usuario logeado
  req.body.createdBy = req.me.id;

  return next();
};
