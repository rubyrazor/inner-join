describe("The Login Page <socialnetwork>", () => {
    it("loads successfully", () => {
        cy.get("[data-cy=login-btn]").click();
        cy.url().should("include", "login");
    });

    it("and login works", () => {
        cy.get("input[name=email]").type("john.doe@example.com");
        cy.get("input[name=pass]").type("qwert");
        cy.get("[data-cy=login-submit-btn]").click();
    });

    it("and logs out again.", () => {
        cy.get("[data-cy=logout-btn]").click();
    });
});
