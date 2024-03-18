module.exports = {
  friendlyName: "Confirm account",

  description: "Confirm account changing the password",

  inputs: {
    newPassword: {
      type: "string",
      required: true,
    },
    acceptTermsAndConditions: {
      type: "boolean",
      required: false,
    },
  },

  exits: {
    success: {
      description: "Password changed and account confirmed successfully",
    },
  },

  fn: async function (inputs) {
    const { newPassword: password, acceptTermsAndConditions = null } = inputs;

    try {
      if (this.req.me?.confirmed !== true) {
        if (acceptTermsAndConditions !== true) {
          return this.res.badRequest({
            customMessage:
              "Debes aceptar los términos y condiciones para continuar",
          });
        }

        // Pasando las validaciones, actualizo el usuario
        const user = await User.updateOne({ id: this.req.me?.id }).set({
          password,
          confirmed: true,
          emailVerifiedAt: new Date(),
          acceptTermsAndConditions,
        });

        return this.res.ok({
          customMessage: "Cuenta confirmada exitosamente",
          user,
        });
      }

      return this.res.badRequest({
        customMessage: "La cuenta ya ha sido confirmada",
      });
    } catch (e) {
      sails.log.error(e);

      if (e["isOperational"]) {
        return this.res.badRequest({
          customMessage: `Error al iniciar sesión con el usuario ${this.req.me?.email}`,
          error: e.raw,
        });
      }

      return this.res.serverError({
        customMessage: `Error al iniciar sesión con el usuario ${this.req.me?.email}`,
      });
    }
  },
};
