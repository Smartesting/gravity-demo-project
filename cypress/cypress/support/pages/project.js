Cypress.Commands.add("createBoard", (name) => {
	cy.get(".plus").click();
	cy.get("input").type("{selectall}").type(name);
	cy.get(".positive").click();
	cy.url().should("include", "boards/");
	cy.contains(name).should("exist");
});

Cypress.Commands.add("createProject", (name) => {
	cy.get(".Projects_addTitle__tXhB4").click();
	cy.get("input").type("{selectall}").type(name);
	cy.get(".green").click();
	cy.url().should("include", "projects/");
});

Cypress.Commands.add("enterProject", (projectName) => {
	cy.get("div.Projects_openTitle__PlaU6:contains(" + projectName + ")").click();
	cy.contains(projectName).should("exist");
});

Cypress.Commands.add("removeProject", () => {
	cy.get(".left.menu > :nth-child(2)").click();
	cy.get(":nth-child(3) > .ui").click();
	cy.get(".content > .ui").click();
});

Cypress.Commands.add("renameProject", (newName) => {
	cy.get(".left.menu > :nth-child(2)").click();
	cy.get("input[name='name']").click();
	cy.focused().type(newName);
	cy.get(":nth-child(2) form button").click();
	cy.get(".close").click();
	cy.contains(newName).should("exist");
});

Cypress.Commands.add("changeBackgroundProject", () => {
	cy.get(".left.menu > :nth-child(2)").click();
	cy.get("div[class*='secondary'] > :nth-child(3)").click();
	cy.get("div[class*='gradientButtons'] >:nth-child(5)").click();
	cy.get(".close").click();
});

Cypress.Commands.add("AddAdminProject", (username) => {
	cy.get(".left.menu > :nth-child(2)").click();
	cy.get("div[class*='secondary'] > :nth-child(2)").click();
	cy.get("div[class*='ManagersPane'] button[class^='ui']").click();
	cy.get(".AddStep_users__nCk8V").contains(username).click();
	cy.get(".close").click();
});

Cypress.Commands.add("RemoveAdminProject", (initials) => {
	cy.get(".left.menu > :nth-child(2)").click();
	cy.get("div[class*='secondary'] > :nth-child(2)").click();
	cy.get("div[class*='ManagersPane']").contains(initials).click();
	cy.get("button[class*='fluid']").click(); // delete
	cy.get("button[class*='fluid']").click(); // confirm
	cy.get(".close").click();
});
