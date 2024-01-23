Cypress.Commands.add("logout", () => {
	cy.get(".right > :last-child").click();
	cy.get(".content > .ui > :nth-child(2)").click();
	cy.url().should("equal", "http://localhost:3000/login");
});

Cypress.Commands.add("changeAvatar", () => {
	cy.get(".right > :last-child").click();
	cy.get(".content > .ui > :nth-child(1)").click();

	cy.get(".User_button__CgzK9:enabled", { timeout: 10000 }).click();

	// Select file from either the same location as Cypress config or the fixture folder
	cy.fixture("avatar.png", null).as("avatarFile");
	cy.get("div[class*='AvatarEditStep'] > input").selectFile("@avatarFile", { force: true });

	//cy.get(".AvatarEditStep_actionButton__TsBby").click();
	cy.get("div > .close").click();
});

Cypress.Commands.add("removeAvatar", () => {
	cy.get(".right > :last-child").click();
	cy.get(".content > .ui > :nth-child(1)").click();

	cy.get(".User_button__CgzK9:enabled", { timeout: 10000 }).click();
	cy.get(".AvatarEditStep_actionButton__TsBby").click();
	cy.get(".content > button.negative").click();
	cy.get("div > .close").click();
});

Cypress.Commands.add("changeLanguage", (language) => {
	cy.get(".right > :last-child").click();
	cy.get(".content > .ui > :nth-child(1)").click();

	cy.get("div.ui.selection").click();
	cy.get("div.ui.selection > div.menu.transition").contains(language).parent().click();
	cy.get("div > .close").click();
});

Cypress.Commands.add("addUser", (email, password, name) => {
	cy.get(".right > :nth-child(1)").click();
	cy.get(".actions > .positive").click();

	cy.get('.form input[name="email"]').type("{selectall}").type(email);
	cy.get('.form input[name="password"]').type("{selectall}").type(password);
	cy.get('.form input[name="name"]').type("{selectall}").type(name);
	cy.get(".form .positive").click();
	cy.get("div > .close").click();
});

Cypress.Commands.add("editUserInformations", (email, name, phone, organization) => {
	cy.get(".right > :nth-child(1)").click();
	cy.get("div.ui.large.modal").contains(email).siblings().find("button").click();
	cy.get("div.ui.bottom.right.popup div.ui.vertical > a:first-child").click();

	// name
	cy.get("div form").find("div:nth-child(2) > input").type("{selectall}").type(name);
	// email
	cy.get("div form").find("div:nth-child(4) > input").type("{selectall}").type(phone);
	// password
	cy.get("div form").find("div:nth-child(6) > input").type("{selectall}").type(organization);
	cy.get("div form button.positive").click();
	cy.get("div > .close").click();
});

Cypress.Commands.add("checkUserInformations", (email, name, phone, organization) => {
	cy.get(".right > :nth-child(1)").click();
	cy.get("div.ui.large.modal").contains(email).siblings().find("button").click();
	cy.get("div.popup div.ui.vertical > a:first-child").click();

	cy.get("div.popup form input[name='name']").should("have.value", name);
	cy.get("div.popup form input[name='phone']").should("have.value", phone);
	cy.get("div.popup form input[name='organization']").should("have.value", organization);
	cy.get("div > div > button[class*='close']").click();
	cy.get("div > .close").click();
});

Cypress.Commands.add("changeUserRights", (email) => {
	cy.get(".right > :nth-child(1)").click();
	cy.get("div[class^='scrolling']").contains(email).siblings().find("label").click();
	cy.get("div > .close").click();
});

Cypress.Commands.add("editCredentials", (oldpassword, username, email, password) => {
	cy.get(".right > :last-child").click();
	cy.get(".content > .ui > :nth-child(1)").click();

	// username
	cy.get("div[class*='AccountPane_wrapper'] > div:nth-last-child(3)").click();
	cy.get('.popup .form input[name="username"]').type("{selectall}").type(username);
	cy.get('.popup .form input[name="currentPassword"]').type("{selectall}").type(oldpassword);
	cy.get(".popup .form .positive").click();

	// email
	cy.get("div[class*='AccountPane_wrapper'] > div:nth-last-child(2)").click();
	cy.get('.popup .form input[name="email"]').type("{selectall}").type(email);
	cy.get('.popup .form input[name="currentPassword"]').type("{selectall}").type(oldpassword);
	cy.get(".popup .form .positive").click();

	// password
	cy.get("div[class*='AccountPane_wrapper'] > div:nth-last-child(1)").click();
	cy.get('.popup .form input[name="password"]').type("{selectall}").type(password);
	cy.get('.popup .form input[name="currentPassword"]').type("{selectall}").type(oldpassword);
	cy.get(".popup .form .positive").click();

	// Always logout, as changing password sometimes disconnected but not always
	cy.url().should("eq", "http://localhost:3000/");
	cy.url().then((url) => {
		if (url === "http://localhost:3000/") {
			cy.get("i.close").should("have.length", 1).click();
			cy.logout();
		}
	});
});

Cypress.Commands.add("checkInformations", (name, phone, organization) => {
	cy.get(".right > :last-child").click();
	cy.get(".content > .ui > :nth-child(1)").click();
	cy.get("div[class*='AccountPane_wrapper'] > form input[name='name']").should(
		"have.value",
		name,
	);
	cy.get("div[class*='AccountPane_wrapper'] > form input[name='phone']").should(
		"have.value",
		phone,
	);
	cy.get("div[class*='AccountPane_wrapper'] > form input[name='organization']").should(
		"have.value",
		organization,
	);
	cy.get("div > .close").click();
});

Cypress.Commands.add("editInformations", (name, phone, organization) => {
	cy.get(".right > :last-child").click();
	cy.get(".content > .ui > :nth-child(1)").click();
	cy.get("div[class*='AccountPane_wrapper'] > form input[name='name']")
		.type("{selectall}")
		.type(name);
	cy.get("div[class*='AccountPane_wrapper'] > form input[name='phone']")
		.type("{selectall}")
		.type(phone);
	cy.get("div[class*='AccountPane_wrapper'] > form input[name='organization']")
		.type("{selectall}")
		.type(organization);
	cy.get("div[class*='AccountPane_wrapper'] > form button.positive").click();
	cy.get("div > .close").click();
});

Cypress.Commands.add("checkNotifications", () => {
	cy.get(".right > :nth-last-child(2)").click();
	cy.get(".NotificationsStep_item__S5ZHC").should("exist");
	cy.get("i[class^='close']").click();
});

Cypress.Commands.add("editUserCredentials", (oldemail, username, email, password) => {
	cy.get(".right > :nth-child(1)").click();

	// username
	cy.get("div.ui.large.modal").contains(oldemail).siblings().find("button").click();
	cy.get("div.popup div.ui.vertical > a:nth-child(2)").click();
	cy.get("div.popup form input[name='username']").type("{selectall}").type(username);
	cy.get(".form .positive").click();

	// email
	cy.wait(500); // necessary otherwise the popup doesn't appear
	cy.get("div.ui.large.modal").contains(oldemail).siblings().find("button").click();
	cy.get("div.popup div.ui.vertical > a:nth-child(3)").click();
	cy.get("div.popup form input[name='email']").type("{selectall}").type(email);
	cy.get(".form .positive").click();

	// password
	// email has changed, we need to use the new email
	cy.wait(500); // necessary otherwise the popup doesn't appear
	cy.get("div.ui.large.modal").contains(email).siblings().find("button").click();
	cy.get("div.popup div.ui.vertical > a:nth-child(4)").click();
	cy.get("div.popup form input[name='password']").type("{selectall}").type(password);
	cy.get(".form .positive").click();

	cy.get("div > .close").click();
});

Cypress.Commands.add("addUserPasswordStrength", (email, nameuser) => {
	cy.get(".right > :nth-child(1)").click();
	cy.get(".actions > .positive").click();

	cy.get('.form input[name="email"]').type("{selectall}").type(email);

	// empty password
	cy.get("div[data-percent='0']").should("exist");

	// weak password
	cy.get('.form input[name="password"]').type("{selectall}").type("1");
	cy.get("div[data-percent='20']").should("exist");

	// medium password
	cy.get('.form input[name="password"]').type("{selectall}").type("Planka");
	cy.get("div[data-percent='40']").should("exist");

	// good password
	cy.get('.form input[name="password"]').type("{selectall}").type("Planka12");
	cy.get("div[data-percent='60']").should("exist");

	// really good password
	cy.get('.form input[name="password"]').type("{selectall}").type("Planka123");
	cy.get("div[data-percent='80']").should("exist");

	// strong password
	cy.get('.form input[name="password"]').type("{selectall}").type("Planka123;;");
	cy.get("div[data-percent='100']").should("exist");

	cy.get('.form input[name="name"]').type("{selectall}").type(nameuser);
	cy.get(".form .positive").click();
	cy.get("div > .close").click();
});

Cypress.Commands.add("filterByMember", (memberName) => {
	cy.get(
		"html > body > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > div > div:nth-of-type(2) > span:nth-of-type(1)",
	).click();

	cy.get("div[class*='Yum-r']").contains(memberName).click();
	cy.get(".Popup_closeButton__iKvZW > .close").click();
});

Cypress.Commands.add("resetFilterByMember", () => {
	cy.get(
		"html > body > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > div > div:nth-of-type(2) > span:nth-of-type(1) > span",
	).click();
});

Cypress.Commands.add("filterByLabel", (labelName) => {
	cy.get(
		"html > body > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > div > div:nth-of-type(2) > span:nth-of-type(2)",
	).click();

	cy.get("div[data-rbd-droppable-id='labels']").contains(labelName).click();
	cy.get(".Popup_closeButton__iKvZW > .close").click();
});

Cypress.Commands.add("resetFilterByLabel", () => {
	cy.get(
		"html > body > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > div > div:nth-of-type(2) > span:nth-of-type(2) > span",
	).click();
});
