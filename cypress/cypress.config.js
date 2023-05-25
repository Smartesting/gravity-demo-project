const { defineConfig } = require("cypress");
const { resetDB } = require("./cypress/support/resetdb");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        'db:reset': async () => {
          await resetDB()
          return 'Reset DB'
        }
      })
      return config;
    },
  },
});
