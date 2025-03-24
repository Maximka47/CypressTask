const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "er8ssw",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
