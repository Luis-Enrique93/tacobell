module.exports.datastores = {
  default: {
    // adapter: 'sails-mysql',
    // url: 'mysql://user:password@host:port/database',
    adapter: "sails-mongo",
    url: process.env.DB_URI,
  },
};
