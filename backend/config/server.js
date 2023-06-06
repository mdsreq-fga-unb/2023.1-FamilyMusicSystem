require("dotenv").config();

module.exports = ({ env }) => ({
  host: process.env.HOST || env("HOST", "0.0.0.0"),
  port: process.env.PORT || env.int("PORT", 1337),
  app: {
    keys:
      process.env.APP_KEYS.split(",").map((key) => key.trim()) ||
      env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations:
      process.env.WEBHOOKS_POPULATE_RELATIONS ||
      env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
});
