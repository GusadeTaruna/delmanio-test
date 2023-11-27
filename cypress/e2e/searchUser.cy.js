describe("searchUser", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/search");
    });
  
    it("search user data and see detail", () => {
      cy.get("[data-testid=email-search]").type("Julio_Larson22@gmail.com");
  
      cy.wait(2000);

      cy.get('[data-testid="view-detail-button"]').should("exist");
      cy.get('[data-testid="view-detail-button"]').click();
    });
  });
  