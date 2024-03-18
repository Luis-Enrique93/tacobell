const { RECOVERY_PASSWORD_TEMPLATE, FRONT_URL_RECOVERY_ACCOUNT } = process.env;

module.exports = {
  friendlyName: "Forgot password",

  description: "",

  inputs: {
    email: {
      description: "The user email",
      example: "albus@dumbledore.com",
      type: "string",
      // required: true,
    },
    dpi: {
      type: "string",
    },
  },

  exits: {
    success: {
      description:
        "Email matched a user and a recovery account might have been sent",
    },
    userNotFound: {
      statusCode: 404,
      description: "Users not found.",
    },
  },

  fn: async function (inputs, exits) {
    try {
      const { email, dpi } = inputs;

      if (!email && !dpi) {
        return this.res.badRequest({
          customMessage: "Campos faltantes, ingrese su email o dpi",
          // details: "El campo 'email' o 'dpi' debe enviarse",
        });
      }

      if (email && dpi) {
        return this.res.badRequest({
          customMessage: "Campos duplicados, solo enviar email o dpi",
          // details: "El campo 'email' y 'dpi'",
        });
      }

      const where = { deletedAt: null };

      if (email) {
        where.email = email?.toLowerCase()?.trim();
      } else if (dpi) {
        where.dpi = dpi;
      }

      let user = await User.findOne(where);

      if (!user) {
        return this.res.json({
          customMessage: "Si se encuentra el usuario, se enviará un email",
        });
      }

      let date = new Date();
      date.setHours(date.getHours() + 24);

      const token = await sails.helpers.strings.random("url-friendly");

      await User.update({ id: user.id }).set({
        passwordResetToken: token,
        passwordResetTokenExpiresAt: date,
      });

      const urlResetPass = `${FRONT_URL_RECOVERY_ACCOUNT}/${token}`;

      console.log({ token });

      const options = {
        to: [email],
        subject: "Recuperacion de contraseña.",
        template: RECOVERY_PASSWORD_TEMPLATE,
        context: {
          URL_Pass: urlResetPass,
        },
      };
      const { error, response } = await sails.helpers.sendMail(options);

      if (error)
        return this.res.badRequest({
          customMessage: `No se ha podido recuperar la cuenta, intentelo más tarde.`,
          error,
        });

      return this.res.ok({
        customMessage: `Se ha enviado un correo electrónico de restablecimiento de contraseña a ${email}.`,
        error: response,
      });
    } catch (error) {
      this.res.serverError({
        customMessage: "Algo salió mal",
        error,
      });
    }
  },
};
