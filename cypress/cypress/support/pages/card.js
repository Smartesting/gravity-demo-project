Cypress.Commands.add('removeCard', () => {
  cy.log("Card page : remove card")
  cy.get(".four > :nth-child(2) > :nth-child(4)").click()
  cy.get(".content > .ui").click()
})

Cypress.Commands.add('addMemberToCard', () => {
  cy.log("Card page : add member to card")
  cy.get(".four > :nth-child(1) > :nth-child(2)").click()
  cy.get(".Item_menuItemText__8FdQH").click()
  cy.get(".button > .close").click()
})

Cypress.Commands.add('addLabelToCard', (label) => {
  cy.log("Card page : add label to card")
  cy.get(".four > :nth-child(1) > :nth-child(3)").click()
  cy.get(".input > input").type("{selectall}").type(label)
  cy.get(".content > .button").click()
  cy.get(".styles_backgroundBrightMoss__UhRRU").click()
  cy.get(".form > .positive").click()
  cy.get(".Item_name__RHn74").click()
  cy.get(".Popup_closeButton__iKvZW > .close").click()
})

Cypress.Commands.add('addCommentToCard', (comment) => {
  cy.log("Card page : add comment to card")
  cy.get(".CommentAdd_field__krf6C").click()
  cy.get(".CommentAdd_field__krf6C").type("{selectall}").type(comment)
  cy.get(".CommentAdd_controls__Xmoil > .ui").click()
  cy.get(".close").click()
})
