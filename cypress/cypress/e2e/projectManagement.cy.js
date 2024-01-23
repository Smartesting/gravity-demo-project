// RESET DB PART

cy.resetDB = function (jsonfile) {
	// Load json, parse it and insert it into the database
	cy.fixture(jsonfile).then((tables) => {
		cy.task("db:insertTable", tables);
		cy.visit("/login");
	});
};

// TEST PART

describe("end to end tests for Project Management", () => {
	beforeEach(() => {
		cy.task("db:truncate");
	});

	/**
	 * @name - New_User_Init_Project
	 * @description - Create a new admin user and create a new project with boards lists and cards
	 * @tagsTypes - 'e2e'
	 * @tagsSubject - 'project_management', 'planka_management
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
	 * @name - Create_Edit_Delete_Column
	 * @description - Create a project, a list, modify the list name, delete it
	 * @tagsTypes - 'regression'
	 * @tagsSubject - 'project_work', 'project_management'
	 */
	it("Create, edit, delete a column", () => {
		// init DB
		cy.resetDB("oneAdmin.json");

		// start session
		cy.viewport(1280, 976);
		cy.login("stephanie@mail.com", "Stephanie123;;");

		cy.createProject("PlankaProject");
		cy.createBoard("Sprint 1");
		cy.createList("To Do");
		cy.editListName("To Do", "Doing");
		cy.removeList();

		cy.logout();
	});

	/**
	 * @name - Change_Title_Project
	 * @description - Using an admin user, modify project name with a new name
	 * @tagsTypes - 'smoke'
	 * @tagsSubject - 'project_management'
	 */
	it("Change the title of a project", () => {
		// init DB
		cy.resetDB("oneAdminProject.json");

		// start session
		cy.viewport(1280, 976);
		cy.login("stephanie@mail.com", "Stephanie123;;");
		cy.enterProject("PlankaProject");
		cy.renameProject("OtherProject");
		cy.logout();
	});

	/**
	 * @name - Manage_Project_Manage_User
	 * @description - Promote users to project manager and revoke users. Login to users to see project
	 * @tagsTypes - 'e2e'
	 * @tagsSubject - 'project_management'
	 */
	it("Manage project, manage user", () => {
		// init DB
		cy.resetDB("oneAdminTwoUsersOneProject.json");

		// start session
		cy.viewport(1280, 976);
		cy.login("stephanie@mail.com", "Stephanie123;;");
		cy.enterProject("PlankaProject");
		cy.AddAdminProject("Victor YEUX");
		cy.AddAdminProject("Nathan PAS");
		cy.logout();
		cy.login("victor@mail.com", "Victor123;;");
		cy.enterProject("PlankaProject");
		cy.RemoveAdminProject("SD");
		cy.logout();
		cy.login("stephanie@mail.com", "Stephanie123;;");
		cy.get("html > body > div > div:nth-of-type(2) > div > div > div:nth-of-type(2)").should(
			"not.exist",
		);
		cy.logout();
		cy.login("nathan@mail.com", "Victor123;;");
		cy.enterProject("PlankaProject");
		cy.RemoveAdminProject("VY");
		cy.logout();
		cy.login("victor@mail.com", "Victor123;;");
		cy.get("html > body > div > div:nth-of-type(2) > div > div > div:nth-of-type(2)").should(
			"not.exist",
		);
		cy.logout();
	});

	/**
	 * @name - Manage_Read_Only_Users
	 * @description - With multiple users, invert read only rights and check it by creating cards and comments
	 * @tagsTypes - 'regression'
	 * @tagsSubject - 'project_management'
	 */
	it("Manage read only users", () => {
		// init DB
		cy.resetDB("oneAdminAndTwoUserProjectBoardList.json");

		// start session
		cy.viewport(1280, 976);
		cy.login("stephanie@mail.com", "Stephanie123;;");
		cy.enterProject("PlankaProject");
		cy.createCard("Card 1", "Todo");
		cy.openCard("Card 1");
		cy.addCommentToCard("Comment 1");
		cy.changeBoardRightsToEditor("VY");
		cy.changeBoardRightsToViewer("NP");
		cy.logout();

		// Editor
		cy.login("victor@mail.com", "Victor123;;");
		cy.enterProject("PlankaProject");
		cy.openCard("Card 1");
		cy.addCommentToCard("Comment 2");
		cy.createCard("Card 2", "Todo");
		cy.openCard("Card 2");
		cy.addCommentToCard("Comment 3");
		cy.logout();

		// Viewer
		cy.login("nathan@mail.com", "Victor123;;");
		cy.enterProject("PlankaProject");
		cy.openCard("Card 1");
		cy.checkCardViewer();
		cy.logout();

		// Swap
		cy.login("stephanie@mail.com", "Stephanie123;;");
		cy.enterProject("PlankaProject");
		cy.changeBoardRightsToViewer("VY");
		cy.changeBoardRightsToEditor("NP");
		cy.logout();

		// Editor
		cy.login("nathan@mail.com", "Victor123;;");
		cy.enterProject("PlankaProject");
		cy.openCard("Card 1");
		cy.addCommentToCard("Comment 4");
		cy.createCard("Card 3", "Todo");
		cy.openCard("Card 3");
		cy.addCommentToCard("Comment 5");
		cy.logout();

		// Viewer
		cy.login("victor@mail.com", "Victor123;;");
		cy.enterProject("PlankaProject");
		cy.openCard("Card 1");
		cy.checkCardViewer();
		cy.logout();
	});

	/**
	 * @name - Change_Project_Background
	 * @description - Change project background image from the default to another one
	 * @tagsTypes - 'sanity'
	 * @tagsSubject - 'project_management'
	 */
	it("Change project background", () => {
		// init DB
		cy.resetDB("oneAdminProject.json");

		// start session
		cy.viewport(1280, 976);
		cy.login("stephanie@mail.com", "Stephanie123;;");
		cy.enterProject("PlankaProject");
		cy.changeBackgroundProject();
		cy.logout();
	});

	/**
	 * @name - Create_And_Edit_Board
	 * @description - Create a board, edit its name. Connect as another user and verify if the board’s name is the same
	 * @tagsTypes - 'sanity'
	 * @tagsSubject - 'project_management'
	 */
	it("Create and edit board", () => {
		// init DB
		cy.resetDB("oneAdminAndUserProjectAndTwoBoardMembers.json");

		// start session
		cy.viewport(1280, 976);
		cy.login("stephanie@mail.com", "Stephanie123;;");
		cy.enterProject("PlankaProject");
		cy.renameBoard("Sprint 1", "OtherBoard");
		cy.logout();
		cy.login("victor@mail.com", "Victor123;;");
		cy.enterProject("PlankaProject");
		cy.contains("OtherBoard").should("exist");
		cy.logout();
	});

	/**
	 * @name - Delete_Project
	 * @description - As an admin, delete current project, and then delete all projects
	 * @tagsTypes - 'smoke'
	 * @tagsSubject - 'project_management'
	 */
	it("Delete project", () => {
		// init DB
		cy.resetDB("oneAdminTwoProject.json");

		// start session
		cy.viewport(1280, 976);
		cy.login("stephanie@mail.com", "Stephanie123;;");
		cy.enterProject("GlpiProject");
		cy.removeProject();
		cy.enterProject("PlankaProject");
		cy.removeProject();
		cy.logout();
	});
});
