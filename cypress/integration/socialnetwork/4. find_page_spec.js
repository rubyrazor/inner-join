describe("The Find Page <socialnetwork>", () => {
    it("successfully opens", () => {
        cy.get("[data-cy=find-people-btn]").click();
        cy.url().should("include", "users");
        cy.get("[data-cy=found-people-container]")
            .children()
            .should("have.length", 4);
    });

    it("searches for users and displays them correctly", () => {
        cy.get("[data-cy=friends-search-fld]").type("a");
        cy.get("[data-cy=other-user-names]").contains("A"); //#2
    });
});