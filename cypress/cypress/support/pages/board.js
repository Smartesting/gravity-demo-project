Cypress.Commands.add("removeBoard", (name) => {
	cy.get(".Boards_tabWrapper__lghjj")
		.contains(oldName)
		.parents()
		.parents()
		.find(".pencil")
		.click();
	cy.get(".content > :nth-child(2)").click();
	cy.get(".content > .ui").click();
});

Cypress.Commands.add("addMemberToBoardAsEditor", (username) => {
	cy.get("button[class*='Memberships']").click();
	cy.get(".AddStep_users__nCk8V").contains(username).click();
	cy.get(".ui.secondary > a:first-child").click();
	cy.get("button[class$='button']").click();
});

Cypress.Commands.add("addMemberToBoardAsViewer", (username) => {
	cy.get("button[class*='Memberships']").click();
	cy.get(".AddStep_users__nCk8V").contains(username).click();
	cy.get(".ui.secondary > a:nth-child(2)").click();
	cy.get("button[class$='button']").click();
});

Cypress.Commands.add("changeBoardRightsToViewer", (username) => {
	cy.get(
		"html > body > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > div > div:nth-of-type(1)",
	)
		.contains(username)
		.click();
	cy.get("html > body > div:nth-of-type(6) > div > div > button:nth-of-type(2)").click();
	cy.get(".ui.secondary > a:nth-child(2)").click();
	cy.get("button[class$='button']").click();
});

Cypress.Commands.add("changeBoardRightsToEditor", (username) => {
	cy.get(
		"html > body > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > div > div:nth-of-type(1)",
	)
		.contains(username)
		.click();
	cy.get("html > body > div:nth-of-type(6) > div > div > button:nth-of-type(2)").click();
	cy.get(".ui.secondary > a:first-child").click();
	cy.get("button[class$='button']").click();
});

Cypress.Commands.add("renameBoard", (oldName, newName) => {
	cy.get(".Boards_tabWrapper__lghjj")
		.contains(oldName)
		.parents()
		.parents()
		.find(".pencil")
		.click();
	cy.get("input[name='name']").click();
	cy.focused().type(newName);
	cy.get(":nth-child(2) form button").click();
});

Cypress.Commands.add("navigateBoard", (boardName) => {
	cy.get(".Boards_tabWrapper__lghjj").contains(boardName).click();
});
