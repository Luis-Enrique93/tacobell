const axios = require("axios");
const { APP_ID, ACCESS_TOKEN, MAIL_URL, EMAIL_ADDRESS } = process.env;

module.exports = {
  friendlyName: "Send mail",

  description: "",

  inputs: {
    options: {
      type: "ref",
      required: true,
    },
  },

  exits: {},

  fn: async ({ options }) => {
    const {
      template,
      subject,
      context = {},
      to = [],
      ...restOptions
    } = options;

    const data = {
      app_id: APP_ID,
      template,
      params: {
        subject,
        from: {
          name: "Carwash",
          address: EMAIL_ADDRESS,
        },
        to,
        all_recipients: to,
        vars: context,
        ...restOptions,
      },
    };

    // console.log(data);

    return axios
      .post(MAIL_URL, data, {
        headers: {
          authorization: ACCESS_TOKEN,
        },
      })
      .then(async (response) => {
        // sails.log.info(response?.data || response);
        return { response: response.data };
      })
      .catch(async (e) => {
        // sails.log.error(e?.response?.data || e);
        return { error: e.response?.data || e.message };
      });
  },
};
