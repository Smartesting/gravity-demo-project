describe('end to end tests', () => {
  beforeEach(() => {
    cy.task('db:reset');
    cy.visit("/login")
  });

  it("creates and delete a project, a board, list and a card", () => {
    cy.log("Session started")
    cy.viewport(1280, 976)
    cy.login("demo@demo.demo", "demo")
    cy.createProject("My Project")
    cy.createBoard("My Board")
    cy.createList("My List")
    cy.createCard("My Card")
    cy.openCard()
    cy.removeCard()
    cy.removeList()
    cy.removeBoard()
    cy.removeProject()
    cy.logout()
  })

  it("add member, label and comment to a card", () => {
    cy.log("Session started")
    cy.viewport(1280, 976)
    cy.login("demo@demo.demo", "demo")
    cy.createProject("My Project")
    cy.createBoard("My Board")
    cy.createList("My List")
    cy.createCard("My Card")
    cy.openCard()
    cy.addMemberToCard()
    cy.addLabelToCard("Mon label")
    cy.addCommentToCard("Mon commentaire !!!")
    cy.openCard()
    cy.removeCard()
    cy.logout()
  })
})
