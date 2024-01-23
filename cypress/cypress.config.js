const { defineConfig } = require("cypress");
const { truncateDB, insertTable } = require("./cypress/support/resetdb");

module.exports = defineConfig({
	chromeWebSecurity: false,
	defaultCommandTimeout: 10000,
	e2e: {
		baseUrl: process.env.BASE_URL || "http://localhost:3000",
		setupNodeEvents(on, config) {
			on("task", {
				"db:truncate": async () => {
					await truncateDB();
					return "Truncate DB";
				},
				"db:insertTable": async (table) => {
					await insertTable(table);
					return "Insert table";
				},
			});
			return config;
		},
	},
	video: false,
});
