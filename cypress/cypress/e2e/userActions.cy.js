cy.resetDB = function (jsonfile) {
	// Load json, parse it and insert it into the database
	cy.fixture(jsonfile).then((tables) => {
		cy.task("db:insertTable", tables);
		cy.visit("/login");
	});
};

describe("end to end tests for User Actions", () => {
	beforeEach(() => {
		cy.task("db:truncate");
	});

	/**
	 * @name - Comment_Check_Notification
	 * @description - Create a card and add a member to it. Connect as the added member, add a comment to the card. On the first account, check the notification is present
	 * @tagsTypes - 'e2e'
	 * @tagsSubject - 'project_work', 'user_actions'
	 */
	it("Comment and check notification", () => {
		// init DB
		cy.resetDB("oneAdminAndUserProjectBoardList.json");

		// start session
		cy.viewport(1280, 976);
		cy.login("stephanie@mail.com", "Stephanie123;;");
		cy.enterProject("PlankaProject");
		cy.subscribeOwnCard();
		cy.createCard("Planka Card", "Todo");
		cy.logout();

		cy.login("victor@mail.com", "Victor123;;");
		cy.enterProject("PlankaProject");
		cy.openCard("Planka Card");
		cy.addCommentToCard("My first comment");
		cy.logout();

		cy.login("stephanie@mail.com", "Stephanie123;;");
		cy.enterProject("PlankaProject");
		cy.checkNotifications();
		cy.logout();
	});

	/**
	 * @name - Change_Language
	 * @description - Switch from the current language to another language and check the changement in a Planka UI text
	 * @tagsTypes - 'smoke'
	 * @tagsSubject - 'user_actions'
	 */
	it("Change language", () => {
		// init DB
		cy.resetDB("oneAdmin.json");

		// start session
		cy.viewport(1280, 976);
		cy.login("stephanie@mail.com", "Stephanie123;;");
		cy.contains("Créer un projet", { timeout: 10000 }).should("exist");
		cy.changeLanguage("Deutsch");
		cy.contains("Créer un projet").should("not.exist");
		cy.contains("Projekt erstellen").should("exist");

		cy.logout();
	});

	/**
	 * @name - Login_And_Disconnect
	 * @description - Login, Disconnect and Login with same credentials
	 * @tagsTypes - 'smoke'
	 * @tagsSubject - 'user_actions'
	 */
	it("Login and disconnect", () => {
		// init DB
		cy.resetDB("oneAdmin.json");

		// start session
		cy.viewport(1280, 976);
		cy.login("stephanie@mail.com", "Stephanie123;;");
		cy.logout();
		cy.login("steph", "Stephanie123;;");
		cy.logout();
	});

	/**
	 * @name - Edit_Credentials
	 * @description - As an admin, create a new user with specific credentials (username, mail, password). Connect as this new user, edit its credentials, disconnect and connect again with the new credentials
	 * @tagsTypes - 'regression'
	 * @tagsSubject - 'user_actions', 'planka_management'
	 */
	it("Edit credentials", () => {
		// init DB
		cy.resetDB("oneAdmin.json");

		// start session
		cy.viewport(1280, 976);
		cy.login("stephanie@mail.com", "Stephanie123;;");

		// create user
		cy.addUser("jean@mail.com", "jean123;;", "Jean");
		cy.logout();

		// login and edit credentials
		cy.login("jean@mail.com", "jean123;;");
		cy.editCredentials("jean123;;", "Jeanne", "jeanne@mail.com", "jeanne321;;");

		// login again (editCredentials always logout)
		cy.login("Jeanne", "jeanne321;;");

		cy.logout();
	});

	/**
	 * @name - Change_And_Delete_Avatar
	 * @description - As a user, change its avatar and delete the avatar.
	 * @tagsTypes - 'sanity'
	 * @tagsSubject - 'user_actions'
	 */
	it("Change and delete avatar", () => {
		// init DB
		cy.resetDB("oneAdmin.json");

		// start session
		cy.viewport(1280, 976);
		cy.login("stephanie@mail.com", "Stephanie123;;");

		// change and remove avatar
		cy.changeAvatar();
		cy.removeAvatar();

		cy.logout();
	});

	/**
	 * @name - Edit_User_Informations
	 * @description - As an admin, create a new user and edit it with specific informations (name, phone, organisation). Connect as the new user, check the informations are the same, edit the informations. As the previous admin, check the informations for this user have changed
	 * @tagsTypes - 'e2e'
	 * @tagsSubject - 'planka_management', 'user_actions'
	 */
	it("Edit user informations", () => {
		// init DB
		cy.resetDB("oneAdmin.json");

		// start session
		cy.viewport(1280, 976);
		cy.login("stephanie@mail.com", "Stephanie123;;");

		// create user with specific informations
		cy.addUser("jean@mail.com", "jean123;;", "Jean");
		let initialName = "Jean";
		let initialPhone = "0123456789";
		let initialOrganization = "Planka";
		cy.editUserInformations("jean@mail.com", initialName, initialPhone, initialOrganization);
		cy.logout();

		// login as the new user and check informations
		cy.login("jean@mail.com", "jean123;;");
		cy.checkInformations(initialName, initialPhone, initialOrganization);

		// edit informations
		let newName = "Jeanne";
		let newPhone = "9876543210";
		let newOrganization = "Planka2";
		cy.editInformations(newName, newPhone, newOrganization);
		cy.logout();

		// login as the admin and check informations have changed
		cy.login("stephanie@mail.com", "Stephanie123;;");
		cy.checkUserInformations("jean@mail.com", newName, newPhone, newOrganization);

		cy.logout();
	});
});
