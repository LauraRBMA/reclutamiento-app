describe('HomePageComponent', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/'); // Visita la ruta principal
  });
  describe('HomePageComponent', () => {
    it('debería mostrar el título correcto', () => {
      cy.get('.home-container p').should(
        'contain.text',
        'RECLUTAMIENTO DE CANDIDATOS'
      );
    });
  });
});
