Cypress.Commands.add("removeCard", () => {
	cy.get(".four > :nth-child(2) > :nth-child(4)").click();
	cy.get(".content > .ui").click();
});

Cypress.Commands.add("addMemberToCard", (username) => {
	cy.get(".four > :nth-child(1) > :nth-child(2)").click();
	cy.get(".Item_menuItemText__8FdQH").contains(username).click();
	cy.get(".button > .close").click();
});

Cypress.Commands.add("createLabel", (label) => {
	cy.get(".four > :nth-child(1) > :nth-child(3)").click();
	cy.get(".input > input").type("{selectall}").type(label);
	cy.get(".content > .button").click();
	cy.get("div[class*='colorButtons'] :nth-child(4)").click();
	cy.get(".form > .positive").click();
	cy.contains(label).should("exist");
	cy.get(".Popup_closeButton__iKvZW > .close").click();
});

Cypress.Commands.add("addLabelToCard", (label) => {
	cy.get(".four > :nth-child(1) > :nth-child(3)").click();
	cy.get(".Item_name__RHn74").contains(label).click();
	cy.get(".Popup_closeButton__iKvZW > .close").click();
});

Cypress.Commands.add("addCommentToCard", (comment) => {
	cy.get(".CommentAdd_field__krf6C").click();
	cy.get(".CommentAdd_field__krf6C").type("{selectall}").type(comment);
	cy.get(".CommentAdd_controls__Xmoil > .ui").click();
	cy.contains(comment).should("exist");
	cy.get("div > .close").click();
});

Cypress.Commands.add("addTaskToCard", (task) => {
	cy.get("button[class^='Tasks']").click();
	cy.get(".Add_wrapper__0iicX textarea").type("{selectall}").type(task);
	cy.get(".Add_wrapper__0iicX button").click();
	cy.contains(task).should("exist");
	cy.get("div > .close").click();
});

Cypress.Commands.add("addCardDueDate", () => {
	cy.get(".four > :nth-child(1) > :nth-child(4)").click();
	cy.get(".popup .form .positive").click();
	let dueDate;
	cy.get("span[class*='wrapperMedium']")
		.invoke("text")
		.then((text) => {
			// Store the text content in the variable
			dueDate = text.trim().toString();
		});
	cy.get("div > .close").click();
	return dueDate;
});

Cypress.Commands.add("checkCardDueDate", () => {
	cy.get("span[class*='wrapperMedium']").should("exist"); // error here
	cy.get(".close").click();
});

Cypress.Commands.add("removeComment", (text) => {
	cy.get(".ui.comments ")
		.contains(text)
		.parent()
		.parent()
		.parent()
		.find("div.actions button:nth-last-of-type(1)")
		.click();
	cy.get("button[class$='button']").click();
	cy.get(".close").click();
});

Cypress.Commands.add("createCard", (name, list) => {
	cy.get("div[data-rbd-droppable-id='board']")
		.contains(list)
		.parent()
		.parent()
		.parent()
		.find("div.List_outerWrapper__B4Idr > button")
		.click();
	cy.focused().type(name);
	cy.get("div[data-rbd-droppable-id='board']")
		.contains(list)
		.parent()
		.parent()
		.parent()
		.find(".CardAdd_submitButton__Kiyd5")
		.click();
	cy.contains(name).should("exist");
});

Cypress.Commands.add("openCard", (cardTitle) => {
	cy.get(".Card_name__vpWb5").contains(cardTitle).click();
});

Cypress.Commands.add("dragDropCard", (list) => {
	const dataTransfer = new DataTransfer();

	cy.get("div[class='Card_wrapper__kLQpI']").trigger("dragstart", { dataTransfer });
	cy.get("div[data-rbd-droppable-id='board'] > :nth-child(2) > :nth-child(1)")
		.contains(list)
		.parent()
		.parent()
		.parent()
		.trigger("drop", { dataTransfer })
		.trigger("dragend");
});

Cypress.Commands.add("subscribeOwnCard", () => {
	cy.get(".right > :nth-last-child(1)").click();
	cy.get(".content > .ui > :nth-child(1)").click();
	cy.get(".ui.pointing.secondary.menu > :nth-child(2)").click();
	cy.get(".ui.segment.active.tab div").click();
	cy.get("div > .close").click();
});

Cypress.Commands.add("checkCardViewer", () => {
	cy.get("html")
		.contains(
			"body > div:nth-of-type(6) > div > div > div > div:nth-of-type(2) > div:nth-of-type(2)",
		)
		.should("not.exist");
	cy.get("div > .close").click();
});
