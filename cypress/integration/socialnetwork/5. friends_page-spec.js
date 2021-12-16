// FRIENDS AND WANNABES PAGE
describe("The Friends and Wannabes Page <socialnetwork>", () => {
    it("loads successfully", () => {
        cy.get("[data-cy=show-friends-btn]").click();
        cy.url().should("include", "friends");
    });
    it("contains a list of friends", () => {
        cy.get("[data-cy=friendships]");
    });
    it("contains a list of wannabes", () => {
        cy.get("[data-cy=friendship-requests]");
    });
});
