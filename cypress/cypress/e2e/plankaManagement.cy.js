// RESET DB PART

cy.resetDB = function (jsonfile) {
	// Load json, parse it and insert it into the database
	cy.fixture(jsonfile).then((tables) => {
		cy.task("db:insertTable", tables);
		cy.visit("/login");
	});
};

// TEST PART

describe("end to end tests for Planka Management", () => {
	beforeEach(() => {
		cy.task("db:truncate");
	});

	/**
	 * @name - Create_Login_Delete_Account
	 * @description - Create a new user using an account and login to it
	 * @tagsTypes - 'regression'
	 * @tagsSubject - 'planka_management'
	 */
	it("Create, login, delete an account", () => {
		// init DB
		cy.resetDB("oneAdmin.json");

		// start session
		cy.viewport(1280, 976);
		cy.login("stephanie@mail.com", "Stephanie123;;");
		cy.addUser("melanietrop@mail.com", "Melanie123;;", "Melanie");
		cy.logout();
		cy.login("melanietrop@mail.com", "Melanie123;;");
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
	 * @name - New_User_Init_Project
	 * @description - Create a new admin user and create a new project with boards lists and cards
	 * @tagsTypes - 'e2e'
	 * @tagsSubject - 'project_management', 'planka_management'
	 */
	it("New user init project", () => {
		// init DB
		cy.resetDB("oneAdmin.json");

		// start session
		cy.viewport(1280, 976);
		cy.login("stephanie@mail.com", "Stephanie123;;");

		cy.addUser("melanietrop@mail.com", "Melanie123;;", "Melanie");
		cy.changeUserRights("melanietrop@mail.com");

		cy.logout();
		cy.login("melanietrop@mail.com", "Melanie123;;");

		cy.createProject("PlankaProject");

		cy.createBoard("Sprint 1");
		cy.createBoard("Sprint 2");
		cy.createBoard("Sprint 3");

		cy.navigateBoard("Sprint 1");
		cy.createList("To Do");
		cy.createCard("Card 1", "To Do");

		cy.navigateBoard("Sprint 2");
		cy.createList("To Do");
		cy.createCard("Card 2", "To Do");
		cy.createList("Doing");
		cy.createCard("Card 3", "Doing");

		cy.navigateBoard("Sprint 3");
		cy.createList("To Do");
		cy.createCard("Card 4", "To Do");
		cy.createList("Doing");
		cy.createCard("Card 5", "Doing");
		cy.createList("Done");
		cy.createCard("Card 6", "Done");

		cy.logout();
	});

	/**
	 * @name - Modify_User_Datas
	 * @description - Modify a specific user’s informations like username, email, etc.
	 * @tagsTypes - 'sanity'
	 * @tagsSubject - 'planka_management'
	 */
	it("Modify user datas", () => {
		// init DB
		cy.resetDB("oneAdmin.json");

		// start session
		cy.viewport(1280, 976);
		cy.login("stephanie@mail.com", "Stephanie123;;");
		let email = "melanietrop@mail.com";
		cy.addUser(email, "Melanie123;;", "Melanie");
		cy.editUserCredentials(email, "Melanie", "melanietrop@mail.org", "Melanie321;;");
		cy.logout();
	});

	/**
	 * @name - Convert_User_Admin
	 * @description - Login to an admin, convert a non-admin user to an admin user and verify he have admin rights by accessing admin panels (login on this user)
	 * @tagsTypes - 'e2e'
	 * @tagsSubject - 'planka_management'
	 */
	it("Convert user admin", () => {
		// init DB
		cy.resetDB("oneAdminAndUser.json");

		// start session
		cy.viewport(1280, 976);
		cy.login("stephanie@mail.com", "Stephanie123;;");
		cy.changeUserRights("victor@mail.com");
		cy.logout();
		cy.login("victor@mail.com", "Victor123;;");
		cy.get(".right > :nth-last-child(3)").should("exist");
	});

	/**
	 * @name - Check_Password_Strength
	 * @description - Check a weak, medium and strong password when creating a new user
	 * @tagsTypes - 'smoke'
	 * @tagsSubject - 'planka_management'
	 */
	it("Check password strength", () => {
		// init DB
		cy.resetDB("oneAdminAndUser.json");

		// start session
		cy.viewport(1280, 976);
		cy.login("stephanie@mail.com", "Stephanie123;;");
		cy.addUserPasswordStrength("melanietrop@mail.com", "Melanie");
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
