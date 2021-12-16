describe("The profile page", () => {
    it('displays default-image, username and bio correctly,', () => {
        cy.get('[data-cy=profile-page-username]').should('have.text', "John Doe");
        cy.get('[data-cy=profile-page-userpic]').should('have.attr', 'src').should('include', '/default.png');
    });

    it('opens modal when image is clicked', () => {
        cy.get('[data-cy=profile-page-username]').click();
       
    });

    it ('uploads image', () => {

    });
    
});


// it("Visits the Kitchen Sink", () => {
//     cy.visit("https://example.cypress.io");

//     cy.contains("type").click();
//     cy.url().should("include", "/commands/actions");

//     cy.get(".action-email")
//         .type("fake@email.com")
//         .should("have.value", "fake@email.com");
// });