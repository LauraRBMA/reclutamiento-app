describe('HomePageComponent', () => {
    beforeEach(() => {
      cy.visit('/'); // Visita la ruta principal
    });
  
    it('debería mostrar el título correcto', () => {
      cy.get('.home-container p').should('contain.text', 'RECLUTAMIENTO DE CANDIDATOS');
    });
  });