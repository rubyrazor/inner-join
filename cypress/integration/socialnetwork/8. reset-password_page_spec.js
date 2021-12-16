describe("The Reset Password Page <socialnetwork>", () => {
    it("loads successfully", () => {
        cy.get("[data-cy=login-btn]").click();
        cy.get("[data-cy=login-reset-btn]").click();
        cy.url().should("include", "reset");
    });

    it("enters new password and verification code successfully", () => {
        cy.get("input[name=email]").type("john.doe@example.com");
        cy.get("[data-cy=reset-submit-btn]").click();
        cy.get("input[name=newPass]").type("qwert");
        cy.get("input[name=verCode]").type("qwert");
        //Check whether we got positive response from aws
    });

    it("shows error message because wrong verificatin Code was submitted", () => {
        cy.get("[data-cy=verCode-submit-btn]").click();
        cy.get("[data-cy=error-msg]");
    });
});
