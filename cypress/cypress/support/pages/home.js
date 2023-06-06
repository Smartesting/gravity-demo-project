Cypress.Commands.add('createProject', (name) => {
  cy.log("Home page : create project")
  cy.get(".Projects_addTitle__tXhB4").click()
  cy.get("input").type("{selectall}").type(name)
  cy.get(".green").click()
  cy.url().should('include', 'projects/')
})

Cypress.Commands.add('logout', () => {
  cy.log("Home page : logout")
  cy.get(".right > :nth-child(3)").click()
  cy.get(".content > .ui > :nth-child(2)").click()
  cy.url().should('equal', 'http://localhost:3000/login')
})
