Cypress.Commands.add('createBoard', (name) => {
  cy.log("Project page : create board")
  cy.get(".plus").click()
  cy.get("input").type("{selectall}").type(name)
  cy.get(".positive").click()
})
