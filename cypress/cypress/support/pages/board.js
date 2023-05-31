Cypress.Commands.add('createList', (name) => {
  cy.log("Board page : create list")
  cy.get(".Board_addListButtonText__o-FjU").click()
  cy.get("input").type("{selectall}").type(name)
  cy.get(".ListAdd_controls__A5EmO > .ui").click()
})

Cypress.Commands.add('createCard', (name) => {
  cy.log("Board page : create card")
  cy.get(".List_addCardButtonText__q66qy").click()
  cy.focused().type(name)
  cy.focused().type("{Enter}")
})

Cypress.Commands.add('openCard', () => {
  cy.log("Board page : open card")
  cy.get(".Card_name__vpWb5").click()
})

Cypress.Commands.add('removeList', () => {
  cy.log("Board page : remove list")
  cy.get(".List_header__kEEi1 > .ui").click()
  cy.get(".ui > :nth-child(3)").click()
  cy.get(".content > .ui").click()
})

Cypress.Commands.add('removeBoard', () => {
  cy.log("Board page : remove board")
  cy.get(".pencil").click()
  cy.get(".content > :nth-child(2)").click()
  cy.get(".content > .ui").click()
})

Cypress.Commands.add('removeProject', () => {
  cy.log("Board page : remove project")
  cy.get(".left.menu > :nth-child(2)").click()
  cy.get(":nth-child(3) > .ui").click()
  cy.get(".content > .ui").click()
})
