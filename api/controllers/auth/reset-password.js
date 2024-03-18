module.exports = {
  friendlyName: "Reset password",

  description: "",

  inputs: {
    password: {
      type: "string",
      description: "The new, unencrypted password.",
      example: "myFancyPassword",
      required: true,
      minLength: 6,
    },
    token: {
      description:
        "The password token that was in the forgot-password endpoint",
      example: "gwa8gs8hgw9h2g9hg29",
      required: true,
    },
  },

  exits: {
    success: {
      description:
        "Password successfully updated, and requesting user agent automatically logged in",
    },
    invalidToken: {
      statusCode: 401,
      description:
        "The provided password token is invalid, expired, or has already been used.",
    },
  },

  fn: async function (inputs, exits) {
    const { password, token } = inputs;

    if (!token) {
      return exits.invalidToken({
        customMessage: "Su token de reinicio no es válido o ha caducado",
      });
    }

    let user = await User.findOne({ passwordResetToken: token });

    if (!user || user["passwordResetTokenExpiresAt"] <= new Date()) {
      return exits.invalidToken({
        customMessage: "Su token de reinicio no es válido o ha caducado",
      });
    }

    user = await User.updateOne({ id: user["id"] }).set({
      password: password,
      passwordResetToken: null,
      passwordResetTokenExpiresAt: null,
    });

    return exits.success({
      customMessage: "Restablecimiento de contraseña exitoso",
      user,
    });
  },
};
