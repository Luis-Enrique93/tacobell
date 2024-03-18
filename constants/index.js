const SUPERADMIN_ROLE_NAME = "Super administrador";

const METHODS_DICTIONARY = {
  Escritura: "POST",
  Lectura: "GET",
  Edición: "PATCH",
  Eliminación: "DELETE",
};

const HTTP_METHODS_DICTIONARY = {
  POST: "Escritura",
  GET: "Lectura",
  PATCH: "Edición",
  PUT: "Edición",
  DELETE: "Eliminación",
};

const ACTIVE_STATUS = "Activo";

const INACTIVE_STATUS = "Inactivo";

const GUATEMALA_PHONE_REGEX = /^([+]502)?[2-9]\d{7}$/;

const DATE_REGEX = /^(?:\d{4})\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;

const TIME_REGEX_24H = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

const TIME_REGEX_12H = /^(0[1-9]|1[0-2]):[0-5][0-9] [APap][mM]$/;

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const ALLOWED_DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const DRIVER_STATUSES = [
  "Disponible",
  "Camino al restaurante",
  "Recogiendo",
  "Camino al cliente",
  "Entregado",
  "Problema",
  "En descanso",
  "Inactivo",
];
const REGEX_HH_MM = /^([01]\d|2[0-3]):([0-5]\d)$/;

const ALLOWED_ISSUE_TYPES = ["Problema", "Emergencia"];

const BASIC_STATUS = [ACTIVE_STATUS, INACTIVE_STATUS];

const REGEX_HEX_COLOR = /^#([0-9A-Fa-f]{6})$/;

module.exports = {
  SUPERADMIN_ROLE_NAME,
  METHODS_DICTIONARY,
  HTTP_METHODS_DICTIONARY,
  ACTIVE_STATUS,
  INACTIVE_STATUS,
  GUATEMALA_PHONE_REGEX,
  DATE_REGEX,
  TIME_REGEX_12H,
  TIME_REGEX_24H,
  EMAIL_REGEX,
  ALLOWED_DAYS,
  DRIVER_STATUSES,
  REGEX_HH_MM,
  ALLOWED_ISSUE_TYPES,
  BASIC_STATUS,
  REGEX_HEX_COLOR,
};
