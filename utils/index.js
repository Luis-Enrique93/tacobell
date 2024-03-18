const {
  EMAIL_REGEX,
  ALLOWED_DAYS,
  GUATEMALA_PHONE_REGEX,
} = require("../constants");
const moment = require("moment-timezone");

function validateNit(nit = "") {
  if (!nit) {
    return false;
  }

  let nitRegExp = new RegExp("^[0-9]+(-?[0-9kK])?$");

  if (!nitRegExp.test(nit)) {
    return false;
  }

  nit = nit.replace(/-/, "");
  let lastChar = nit.length - 1;
  let number = nit.substring(0, lastChar);
  let expectedCheker = nit.substring(lastChar, lastChar + 1).toLowerCase();

  let factor = number.length + 1;
  let total = 0;

  for (let i = 0; i < number.length; i++) {
    let character = number.substring(i, i + 1);
    let digit = parseInt(character, 10);

    total += digit * factor;
    factor = factor - 1;
  }

  let modulus = (11 - (total % 11)) % 11;
  let computedChecker = modulus == 10 ? "k" : modulus.toString();

  return expectedCheker === computedChecker;
}

function capitalizeWord(word = "") {
  if (typeof word !== "string" || word.length === 0) {
    return ""; // Return an empty string for non-strings or empty input
  }

  return word[0].toUpperCase() + word.slice(1);
}

function isLiteralObject(obj) {
  return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}

function generateEmployeeCode(employeeId = 1) {
  const prefix = "EMP";
  // Pad the ID with leading zeros
  const paddedId = employeeId.toString().padStart(4, "0");

  return prefix + paddedId;
}

function isValidEmail(email = "") {
  return EMAIL_REGEX.test(email);
}

function generateStrongPassword(length = 12) {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numericChars = "0123456789";
  const specialChars = "!@#$%^&*()_-+=<>?";

  const allChars =
    uppercaseChars + lowercaseChars + numericChars + specialChars;

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  return password;
}

function removeQueryParams(url) {
  // Divide la URL en dos partes: la parte antes del '?' y la parte después del '?'
  const partes = url.split("?");

  // La parte antes del '?' es la URL base
  const urlBase = partes[0];

  // La parte después del '?' contiene los parámetros de consulta
  // Si no hay '?' en la URL, esta parte será undefined
  const parametrosConsulta = partes[1];

  // Si hay parámetros de consulta, simplemente devuelve la URL base
  return urlBase;
}

function calculateElapsedTime(createdAtStr) {
  const now = new Date();
  // let now = moment().tz("Etc/Greenwich");
  // now = now.toDate();
  const createdAt = new Date(createdAtStr);
  const elapsedMillis = now.getTime() - createdAt.getTime();

  // Convertir milisegundos a minutos
  const elapsedMinutes = Math.floor(elapsedMillis / (1000 * 60));

  // Definir límites para diferentes unidades de tiempo
  const oneMinuteInMillis = 60 * 1000;
  const oneHourInMillis = oneMinuteInMillis * 60;
  const oneDayInMillis = oneHourInMillis * 24;

  // console.log({ elapsedMinutes, now, createdAt });

  if (elapsedMinutes < 1) {
    return "Hace un momento";
  } else if (elapsedMinutes < 60) {
    return `Hace ${elapsedMinutes} ${
      elapsedMinutes === 1 ? "minuto" : "minutos"
    }`;
  } else if (
    elapsedMillis < oneHourInMillis ||
    elapsedMillis < oneDayInMillis
  ) {
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    return `Hace ${elapsedHours} ${elapsedHours === 1 ? "hora" : "horas"}`;
  } else if (elapsedMillis <= oneDayInMillis * 5) {
    const elapsedDays = Math.floor(elapsedMillis / oneDayInMillis);
    return `Hace ${elapsedDays === 1 ? "un día" : `${elapsedDays} días`}`;
  } else {
    // Si han pasado más de 5 días, mostrar la fecha en formato DD/MM/YYYY
    return formatDate(createdAt);
  }
}

function formatDate(
  date,
  format = "DD/MM/YYYY",
  timeZone = "America/Guatemala"
) {
  // Convertir la fecha a la zona horaria de Guatemala (por ejemplo, America/Guatemala)
  const dateInGuatemalaTimeZone = moment(date).tz(timeZone);

  // Formatear la fecha en el formato DD/MM/YYYY
  const formattedDate = dateInGuatemalaTimeZone.format(format);
  return formattedDate;
}

const formatDateTask = (dateStr) => {
  const date = new Date(dateStr);

  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

const validateArrayDays = (value) => {
  const isArray = Array.isArray(value);

  if (!isArray) return false;

  if (!value.length) return true;

  // Validar que no haya días inválidos
  const hasInvalidValues = value.some((day) => {
    if (!ALLOWED_DAYS.includes(day)) return true;
  });

  if (hasInvalidValues) return false;

  // Validar que no haya días duplicados
  const uniqueDays = new Set(value);
  const hasDuplicateDays = uniqueDays.size - 1 !== value.length;

  return hasDuplicateDays;
};

const getStartOfCurrentDate = () => {
  const currentDate = moment().tz("America/Guatemala");
  const startOfDay = currentDate.startOf("day");

  // return startOfDay.format("YYYY/MM/DD");
  return startOfDay;
};

function validateGuatemalaPhoneNumber(numero) {
  // Verificar si el número coincide con el patrón
  return GUATEMALA_PHONE_REGEX.test(numero);
}

function generateRandomCode(n = 10) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let code = "";

  for (let i = 0; i < n; i++) {
    const indice = Math.floor(Math.random() * letters.length);
    code += letters.charAt(indice);
  }

  return code;
}

function getCardType(cardNumber) {
  // Eliminar espacios en blanco y caracteres no numéricos
  const cleanedNumber = cardNumber.replace(/\D/g, "");

  // Comprobar el rango de números para determinar el tipo de tarjeta
  if (/^4/.test(cleanedNumber)) {
    return "VISA";
  } else if (/^5[1-5]/.test(cleanedNumber)) {
    return "MASTERCARD";
  } else if (/^3[47]/.test(cleanedNumber)) {
    return "AMEX";
  } else {
    return null;
  }
}

function isValidExpiryDate(expiryDate) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Meses en JavaScript se cuentan desde 0

  // Verificar el formato MM/YYYY
  const datePattern = /^(0[1-9]|1[0-2])\/\d{4}$/;

  if (!datePattern.test(expiryDate)) {
    return false; // Formato inválido
  }

  // Separar el mes y el año
  const [month, year] = expiryDate.split("/");

  // Convertir a números
  const expiryMonth = parseInt(month, 10);
  const expiryYear = parseInt(year, 10);

  // Verificar si la fecha de vencimiento es en el futuro
  if (
    expiryYear < currentYear ||
    (expiryYear === currentYear && expiryMonth < currentMonth)
  ) {
    return false; // Fecha pasada
  }

  return true;
}

function formatPrice(price = 0, decimals = 2) {
  // Utilizamos toFixed para limitar a dos decimales y convertir a cadena
  return price.toFixed(decimals);
}

function roundPrice(number) {
  return Math.round(number * 100) / 100;
}

function removeAccent(palabra) {
  const tildes = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    ü: "u",
    ñ: "n",
    Á: "A",
    É: "E",
    Í: "I",
    Ó: "O",
    Ú: "U",
    Ü: "U",
    Ñ: "N",
  };

  return palabra.replace(
    /[áéíóúüñÁÉÍÓÚÜÑ]/g,
    (match) => tildes[match] || match
  );
}

function generateAlphanumericCode(length = 8) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
}

function toPascalCase(str = "") {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

module.exports = {
  validateNit,
  capitalizeWord,
  isLiteralObject,
  generateEmployeeCode,
  isValidEmail,
  generateStrongPassword,
  removeQueryParams,
  calculateElapsedTime,
  formatDate,
  validateArrayDays,
  formatDateTask,
  getStartOfCurrentDate,
  validateGuatemalaPhoneNumber,
  generateRandomCode,
  getCardType,
  isValidExpiryDate,
  formatPrice,
  roundPrice,
  removeAccent,
  generateAlphanumericCode,
  toPascalCase,
};
