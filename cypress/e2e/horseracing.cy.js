describe('Horse Racing Game', () => {
  it('generates program and starts the race', () => {
    cy.visit('http://localhost:5173')
    cy.contains('button', 'GENERATE PROGRAM').click()
    cy.contains('button', 'START').click()
  })
})
