describe("The Chat Page <socialnetwork>", () => {
    it("successfully opens", () => {
        cy.get("[data-cy=show-chat-btn]").click();
        cy.url().should("include", "chat");
    });

    it("allows to write a message", () => {
        cy.get("[data-cy=message-input-fld]")
            .type(
                "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
            )
            .type("{enter}");
    });

    it("and displays it correctly", () => {
        cy.get("[data-cy=message-text]")
            .first()
            .contains(
                "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
            );
    });

    it("and logs out", () => {
        cy.get("[data-cy=logout-btn]").click();
        //Check whether it correctly loads landing page
    });
});