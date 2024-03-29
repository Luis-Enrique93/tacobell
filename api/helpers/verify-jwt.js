const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = {
  friendlyName: "Verify JWT",

  description: "Verify a JWT token.",

  inputs: {
    req: {
      type: "ref",
      friendlyName: "Request",
      description: "A reference to the request object (req).",
      required: true,
    },
    res: {
      type: "ref",
      friendlyName: "Response",
      description: "A reference to the response object (res).",
      required: false,
    },
  },

  exits: {
    invalid: {
      description: "Invalid token or no authentication present.",
    },
  },

  fn: function (inputs, exits) {
    const req = inputs.req;

    if (req.header("authorization")) {
      // if one exists, attempt to get the header data
      const token = req.header("authorization").split("Bearer ")[1];

      // if there's nothing after "Bearer", no go
      if (!token) {
        return exits.invalid();
      }

      // if there is something, attempt to parse it as a JWT token
      return jwt.verify(token, JWT_SECRET, async (err, payload) => {
        if (err || !payload.sub) {
          return exits.invalid();
        }

        const { sub, type = "email" } = payload;

        const user =
          type === "email"
            ? await User.findOne({ email: sub, deletedAt: null }).populate(
                "role"
              )
            : await User.findOne({ dpi: sub, deletedAt: null }).populate(
                "role"
              );

        if (!user) {
          return exits.invalid();
        }
        // if it got this far, everything checks out, success
        req.me = user;
        req.role = user.role?.name;
        return exits.success(user);
      });
    }

    return exits.invalid();
  },
};
