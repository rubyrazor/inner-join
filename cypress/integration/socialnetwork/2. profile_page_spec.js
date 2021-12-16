const bio1 =
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.";
const bio2 =
    "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.";
    
describe("The Profile Page <socialnetwork>", () => {
    it("displays default-image, username and bio correctly", () => {
        cy.get("[data-cy=profile-page-username]").should(
            "have.text",
            "John Doe"
        );
        cy.get("[data-cy=profile-page-userpic]")
            .should("have.attr", "src")
            .should("include", "/default.png");

        cy.get("[data-cy=profile-page-bio]").should("have.text", "");
    });

    it("opens modal when image is clicked", () => {
        cy.get(".bigProfilePic").click(); //[data-cy=profile-page-userpic]
        cy.get("[data-cy=uploader-modal]").should("be.visible");
    });

    it("allows to add bio", () => {
        cy.get("[data-cy=profile-page-bio-editor]").type(bio1);
        cy.get("[data-cy=profile-page-bio-editor]").should("have.value", bio1);
        cy.get("[data-cy=save-bio-btn]").click();

        cy.get("[data-cy=profile-page-bio]").should("have.text", bio1);
    });

    it("allows to edit bio", () => {
        cy.get("[data-cy=edit-bio-btn]").click();

        cy.get("[data-cy=profile-page-bio-editor]")
            .clear()
            .type(bio2)
            .should("have.value", bio2);
        cy.get("[data-cy=save-bio-btn]").click();
    });

    it("allows to exit editor without editing", () => {
        cy.get("[data-cy=edit-bio-btn]").click();
        cy.get("[data-cy=exit-bio-btn]").click();
    });
});