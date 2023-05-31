Cypress.Commands.add('login', (email, password) => {
  cy.log("Login page : login")
  cy.get(":nth-child(1) > .ui > input").type("{selectall}").type(email)
  cy.get(":nth-child(2) > .ui > input").type("{selectall}").type(password)
  cy.get(".field > .ui").click()
})
