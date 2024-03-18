/**
 * Production environment settings
 * (sails.config.*)
 *
 * What you see below is a quick outline of the built-in settings you need
 * to configure your Sails app for production.  The configuration in this file
 * is only used in your production environment, i.e. when you lift your app using:
 *
 * ```
 * NODE_ENV=production node app
 * ```
 *
 * > If you're using git as a version control solution for your Sails app,
 * > this file WILL BE COMMITTED to your repository by default, unless you add
 * > it to your .gitignore file.  If your repository will be publicly viewable,
 * > don't add private/sensitive data (like API secrets / db passwords) to this file!
 *
 * For more best practices and tips, see:
 * https://sailsjs.com/docs/concepts/deployment
 */

module.exports = {
  datastores: {
    default: {
      adapter: "sails-mongo",
      url: process.env.DB_URI,
    },
  },

  models: {
    // cascadeOnDestroy: false,
    schema: true,
    migrate: "safe",
    // attributes: {
    //   createdAt: { type: "string", autoCreatedAt: true },
    //   updatedAt: { type: "string", autoUpdatedAt: true },
    //   deletedAt: { type: "string", allowNull: true },
    //   id: { type: "string", columnName: "_id" },
    // },
    attributes: {
      createdAt: {
        type: "string",
        columnType: "datetime",
        autoCreatedAt: true,
      },
      updatedAt: {
        type: "string",
        columnType: "datetime",
        autoUpdatedAt: true,
      },
      deletedAt: { type: "string", columnType: "datetime", allowNull: true },
      id: { type: "string", columnName: "_id" },
    },
  },

  blueprints: {
    shortcuts: false,
  },

  security: {
    cors: {
      // allowOrigins: [
      //   'https://example.com',
      // ]
      allRoutes: true,
      allowOrigins: "*",
      allowCredentials: false,
      allowRequestHeaders: "Content-Type,Authorization,Accept,appid",
      allowRequestMethods: "GET, POST, PATCH, PUT, DELETE",
      allowAnyOriginWithCredentialsUnsafe: true,
    },
  },

  session: {
    cookie: {
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  },

  sockets: {},

  log: {
    level: "debug",
  },

  http: {
    // One year
    cache: 365.25 * 24 * 60 * 60 * 1000,
  },

  // ssl: undefined,

  custom: {
    //! DEV VARIABLES
    baseUrl: "https://example.com",
    internalEmailAddress: "support@example.com",
    //! PROD VARIABLES
    baseUrl: "https://example.com",
  },
};
