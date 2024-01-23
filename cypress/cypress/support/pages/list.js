Cypress.Commands.add("createList", (name) => {
	cy.get("div[class='Board_list__VkZpM'] button").click();
	cy.get("input").type("{selectall}").type(name);
	cy.get(".ListAdd_controls__A5EmO > .ui").click();
	cy.contains(name).should("exist");
});

Cypress.Commands.add("editListName", (oldName, newName) => {
	cy.get("div.List_headerName__ztYJO:contains(" + oldName + ")").click();
	cy.get("textarea:contains(" + oldName + ")")
		.type("{selectall}")
		.type(newName);
	cy.contains(newName).should("exist");
});

Cypress.Commands.add("removeList", () => {
	cy.get(".List_header__kEEi1 > .ui").click();
	cy.get(".ui > :nth-child(3)").click();
	cy.get(".content > .ui").click();
});
