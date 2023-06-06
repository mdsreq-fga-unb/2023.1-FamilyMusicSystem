require("dotenv").config({ path: ".env" });

module.exports = {
  setupFilesAfterEnv: ["./jest.setup.js"],
};
