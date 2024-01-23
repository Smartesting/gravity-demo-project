// RESET DB PART

cy.resetDB = function (jsonfile) {
	// Load json, parse it and insert it into the database
	cy.fixture(jsonfile).then((tables) => {
		cy.task("db:insertTable", tables);
		cy.visit("/login");
	});
};

// TEST PART

describe("end to end tests for Project Work", () => {
	beforeEach(() => {
		cy.task("db:truncate");
	});

	/**
	 * @name - Navigate_Project
	 * @description - Navigate to an existing project
	 * @tagsTypes - 'smoke'
	 * @tagsSubject - 'project_work'
	 */
	it("Navigate project", () => {
		// init DB
		cy.resetDB("oneAdminProject.json");

		// start session
		cy.viewport(1280, 976);
		cy.login("stephanie@mail.com", "Stephanie123;;");
		cy.enterProject("PlankaProject");
		cy.logout();
	});

	/**
	 * @name - Login_To_Planka
	 * @description - Login to Planka using existing credentials
	 * @tagsTypes - 'sanity'
	 * @tagsSubject - 'project_work'
	 */
	it("Login to Planka", () => {
		// init DB
		cy.resetDB("oneAdminProject.json");

		// start session
		cy.viewport(1280, 976);
		cy.login("stephanie@mail.com", "Stephanie123;;");
		cy.logout();
	});

	/**
	 * @name - Create_Edit_Delete_Column
	 * @description - Create a project, a list, a column, modify the column name, delete it
	 * @tagsTypes - 'regression'
	 * @tagsSubject - 'project_work', 'project_management'
	 */
	it("Create, edit, delete a column", () => {
		// init DB
		cy.resetDB("oneAdmin.json");

		// start session
		cy.viewport(1280, 976);
		cy.login("stephanie@mail.com", "Stephanie123;;");
		cy.createProject("Planka Project");
		cy.createBoard("Planka Board");
		cy.createList("Planka List");
		cy.editListName("Planka List", "PlankaList Edited");
		cy.removeList();
		cy.logout();
	});

	/**
	 * @name - Create_And_Edit_Card
	 * @description - Create a card, edit its due date. Connect as another user and verify the card’s due date is the same
	 * @tagsTypes - 'sanity'
	 * @tagsSubject - 'project_work'
	 */
	it("Create and edit a card", () => {
		// init DB
		cy.resetDB("oneAdminAndUserProjectBoardList.json");

		// start session
		cy.viewport(1280, 976);
		cy.login("stephanie@mail.com", "Stephanie123;;");
		cy.enterProject("PlankaProject");
		cy.createCard("Planka Card", "Todo");
		cy.openCard("Planka Card");
		cy.addCardDueDate();

		cy.logout();
		cy.login("victor@mail.com", "Victor123;;");
		cy.enterProject("PlankaProject");
		cy.openCard("Planka Card");
		cy.checkCardDueDate();
		cy.logout();
	});

	/**
	 * @name - Filter_Cards
	 * @description - Create three cards and add a different combination of members and tags to each one. Filter by tags and members
	 * @tagsTypes - 'regression'
	 * @tagsSubject - 'project_work'
	 */
	it("Filter cards", () => {
		// init DB
		cy.resetDB("oneAdminAndTwoUserProjectBoardList.json");

		// start session
		cy.viewport(1280, 976);
		cy.login("stephanie@mail.com", "Stephanie123;;");
		cy.enterProject("PlankaProject");

		cy.createCard("Planka Card 1", "Todo");
		cy.openCard("Planka Card 1");
		cy.createLabel("Planka Label 1");
		cy.addMemberToCard("Stephanie DEZ");
		cy.addMemberToCard("Victor YEUX");
		cy.addLabelToCard("Planka Label 1");
		cy.get("div > .close").click();

		cy.createCard("Planka Card 2", "Todo");
		cy.openCard("Planka Card 2");
		cy.createLabel("Planka Label 2");
		cy.addMemberToCard("Victor YEUX");
		cy.addMemberToCard("Nathan PAS");
		cy.addLabelToCard("Planka Label 2");
		cy.get("div > .close").click();

		cy.createCard("Planka Card 3", "Todo");
		cy.openCard("Planka Card 3");
		cy.createLabel("Planka Label 3");
		cy.addMemberToCard("Nathan PAS");
		cy.addMemberToCard("Stephanie DEZ");
		cy.addLabelToCard("Planka Label 3");
		cy.get("div > .close").click();

		cy.filterByMember("Stephanie DEZ");
		cy.contains("Planka Card 1").should("exist");
		cy.contains("Planka Card 3").should("exist");
		cy.contains("Planka Card 2").should("not.exist");

		cy.resetFilterByMember();

		cy.filterByLabel("Planka Label 2");
		cy.contains("Planka Card 2").should("exist");
		cy.contains("Planka Card 1").should("not.exist");
		cy.contains("Planka Card 3").should("not.exist");

		cy.resetFilterByLabel();

		cy.logout();
	});

	/**
	 * @name - Create_And_Delete_Comment
	 * @description - Create a card, then create a comment, create another comment, and delete the first one
	 * @tagsTypes - 'smoke'
	 * @tagsSubject - 'project_work'
	 */
	it("Create and delete a comment", () => {
		// init DB
		cy.resetDB("oneAdminProjectBoardList.json");

		// start session
		cy.viewport(1280, 976);
		cy.login("stephanie@mail.com", "Stephanie123;;");
		cy.enterProject("PlankaProject");
		cy.createCard("Planka Card", "Todo");
		cy.openCard("Planka Card");
		cy.addCommentToCard("My first comment");
		cy.openCard("Planka Card");
		cy.addCommentToCard("My second comment");
		cy.openCard("Planka Card");
		cy.removeComment("My first comment");
		cy.logout();
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
	 * @name - Manage_And_Specify_Card
	 * @description - Add three lists, create a card in the first column and add tasks inside it. Check some of the tasks and move it to the second column. Check the remaining tasks in the card and move it the third column
	 * @tagsTypes - 'e2e'
	 * @tagsSubject - 'project_work'
	 */
	it("Manage and specify card", () => {
		// init DB
		cy.resetDB("oneAdminProjectBoard.json");

		// start session
		cy.viewport(1280, 976);
		cy.login("stephanie@mail.com", "Stephanie123;;");
		cy.enterProject("PlankaProject");
		cy.createList("Planka List 1");
		cy.createList("Planka List 2");
		cy.createList("Planka List 3");
		cy.createCard("Planka Card", "Planka List 1");
		cy.openCard("Planka Card");
		cy.addTaskToCard("My first task");
		cy.openCard("Planka Card");
		cy.addTaskToCard("My second task");
		cy.openCard("Planka Card");
		cy.addTaskToCard("My third task");
		//cy.dragDropCard("Planka List 2");
		//cy.dragDropCard("Planka List 3");
		cy.logout();
	});
});
