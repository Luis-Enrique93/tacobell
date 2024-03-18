module.exports = {
  friendlyName: "Login",

  description: "Login user.",

  inputs: {
    email: {
      type: "string",
      allowNull: true,
    },
    password: {
      type: "string",
      required: true,
    },
    dpi: {
      type: "string",
      allowNull: true,
    },
  },

  exits: {},

  // StatusCode
  // 00 -> Inicio de sesión exitoso
  // 01 -> Credenciales incorrectas
  // 02 -> Inicio de sesión exitoso
  // 03 -> Usuario bloqueado
  // 04 -> Cuenta no confirmada
  // 05 -> Error desconocido

  fn: async function (inputs, exits) {
    const { email, password, dpi } = inputs;

    try {
      if ((!email && !dpi) || (email && dpi)) {
        return this.res.badRequest({
          customMessage: "Usuario requerido",
          details: "Debe enviarse un campo 'email' o 'dpi', pero no ambos",
        });
      }

      const where = { deletedAt: null };

      if (email) {
        where.email = email.toLowerCase().trim();
      } else if (dpi) {
        where.dpi = dpi;
      }

      const user = await User.findOne(where).populate("role");

      if (!user) {
        return this.res.status(404).json({
          statusCode: "01",
          customMessage: "Credenciales incorrectas",
        });
      }

      await sails.helpers.passwords.checkPassword(password, user["password"]);

      const optionsJwt = {
        subject: email || dpi,
        type: email ? "email" : "dpi",
      };

      const token = await sails.helpers.generateNewJwtToken.with(optionsJwt);

      // Valido que no esté bloqueado
      if (user.status !== "Activo") {
        return this.res.status(401).json({
          statusCode: "03",
          customMessage: "Esta cuenta ha sido bloqueada. Contacta a soporte",
        });
      }

      // Si la cuenta está confirmada
      if (user.confirmed === true) {
        return this.res.ok({
          statusCode: "00",
          customMessage: `${email} ha iniciado sesión exitosamente`,
          user,
          token,
        });
      }

      return this.res.ok({
        temporaryPassword: true,
        statusCode: "04",
        customMessage: "Debes cambiar la contraseña temporal",
        token,
      });
    } catch (e) {
      if (e["isOperational"]) {
        if (e.code === "incorrect")
          return this.res.badRequest({
            statusCode: "01",
            customMessage: "Credenciales incorrectas",
          });

        return this.res.badRequest({
          statusCode: "05",
          customMessage: `Error al iniciar sesión con el usuario ${email}`,
          details: e.raw || e.message,
        });
      }

      return this.res.serverError({
        statusCode: "05",
        customMessage: `Error al iniciar sesión con el usuario ${email}`,
        details: e.message,
      });
    }
  },
};
