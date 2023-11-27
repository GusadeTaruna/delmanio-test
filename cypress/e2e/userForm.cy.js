describe("UserForm", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/register");
  });

  it("should submit the form with valid data", () => {
    cy.get("[data-testid=name-input]").type("Gusade");
    cy.get("[data-testid=email-input]").type("gusade@mail.com");

    cy.intercept("POST", "https://delman-fe-api.fly.dev/users", {
      statusCode: 200,
      body: { success: true },
    }).as("addUserMutation");

    cy.get("[data-testid=submit-button]").click();

    cy.wait("@addUserMutation").then((interception) => {
      expect(interception.request.body).to.deep.equal({
        name: "Gusade",
        email: "gusade@mail.com",
      });

      cy.contains("User Created").should("be.visible");
    });
  });

  it("should display an error message for invalid data", () => {
    cy.get('[data-testid="name-input"]').type("Gusade");
    cy.get('[data-testid="email-input"]').type("gusade.mail");
    cy.get('[data-testid="submit-button"]').click();

  });
});
