
describe('The Login Page', () => {
  it('successfully loads', () => {
    cy.visit('/login')

    cy.get('input[name=username]').type(Cypress.env('username'))
    cy.get('input[name=password]').type(`${Cypress.env('password')}{enter}`)

    cy.url().should('include', '/demo')

    // cy.getCookie('token').should('exist')

    // cy.get('div.src-components-Layout-LoginInfo-index__name').should(
    //   'contain',
    //   Cypress.env('username')
    // )
  })
})