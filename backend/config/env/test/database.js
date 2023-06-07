module.exports = ({ env }) => ({
  connection: {
    client: "sqlite",
    connection: {
      filename: env("backend", ".tmp/test.db"),
    },
    useNullAsDefault: true,
    debug: false,
  },
});
