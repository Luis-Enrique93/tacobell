const { validateNit } = require("../../../utils");

module.exports = {
  friendlyName: "Register",

  description: "Register user.",

  inputs: {
    name: {
      type: "string",
      required: true,
    },
    lastname: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      isEmail: true,
      allowNull: true,
    },
    dpi: {
      type: "string",
      allowNull: true,
    },
    phone: {
      type: "string",
      allowNull: true,
    },
    password: {
      type: "string",
      required: true,
      minLength: 8,
    },
    role: {
      type: "string",
      required: true,
    },
    branch: {
      type: "string",
      allowNull: true,
      // required: true,
    },
    company: {
      type: "string",
      allowNull: true,
    },
    avatar: {
      type: "string",
      allowNull: true,
    },
  },

  exits: {
    success: {
      statusCode: 201,
      description:
        "An account has been created successfully. Check your email to verify",
    },
    emailAlreadyInUse: {
      statusCode: 400,
      description: "Email address already in use",
    },
    error: {
      description: "Something went wrong",
    },
  },

  fn: async function (inputs, exits) {
    const {
      name,
      lastname,
      email,
      dpi,
      phone,
      password,
      role,
      branch,
      company,
      avatar,
    } = inputs;

    try {
      if (!email || !dpi) {
        return this.res.badRequest({
          customMessage: "Campos faltantes: email o dpi",
          details: "email or dpi field must be present",
        });
      }

      if (email) {
        const userAlredyExists = await User.count({
          email: email.toLowerCase().trim(),
          deletedAt: null,
        });

        if (userAlredyExists) {
          return exits.emailAlreadyInUse({
            customMessage: `El email ${email} ya se ha registrado`,
            error: "This email address already exits",
          });
        }
      }

      if (dpi) {
        const userAlredyExists = await User.count({
          dpi,
          deletedAt: null,
        });

        if (userAlredyExists) {
          return exits.emailAlreadyInUse({
            customMessage: `El dpi ${dpi} ya se ha registrado`,
            error: "This dpi already exits",
          });
        }
      }

      let user = await User.create({
        name,
        lastname,
        email,
        dpi,
        phone,
        password,
        role,
        branch,
        company,
        avatar,
      }).fetch();

      return exits.success({
        customMessage: `Usuario registrado exitosamente`,
        user,
      });
    } catch (e) {
      return exits.error({
        customMessage: "Algo salió mal",
        error: e.message,
      });
    }
  },
};
