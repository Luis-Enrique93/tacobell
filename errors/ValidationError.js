class ValidationError extends Error {
  constructor(message, detail, httpStatus = 400) {
    super(message);
    this.validationError = true;
    this.detail = detail;
    this.httpStatus = httpStatus;
  }
}

module.exports = ValidationError;
