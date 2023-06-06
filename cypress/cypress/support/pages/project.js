Cypress.Commands.add('createBoard', (name) => {
  cy.log("Project page : create board")
  cy.get(".plus").click()
  cy.get("input").type("{selectall}").type(name)
  cy.get(".positive").click()
  cy.url().should('include', 'boards/')
  cy.contains(name).should("exist")
})
