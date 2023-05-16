describe('Board management', () => {
  beforeEach(() => {
    cy.task('db:reset');
  });

  it('creates a project and a board', () => {
    cy.visit('/');
    cy.get('[name="emailOrUsername"]').type('demo@demo.demo');
    cy.get('[name="password"]').type('demo');
    cy.get('button').click();
    cy.get('.Projects_addGridIcon__RqH-D').click();
    cy.get('input').click();
    cy.get('input').type("My project");
    cy.get('.green').click();
    cy.get('.plus').click();
    cy.focused().type("My board");
    cy.get('.positive').click();
  })
})
