describe('Board management', () => {
  it('passes', () => {
    cy.visit('/');
    cy.get('[name="emailOrUsername"]').type('demo@demo.demo');
    cy.get('[name="password"]').type('demo');
    cy.get('button').click();
  })
})
 