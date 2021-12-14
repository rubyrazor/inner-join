describe("The Landing Page", () => {
    it("successfully loads", () => {
        cy.visit("/");
    });

    it("successfully allows submit if all input fields are filled out", () => {
        //Check that there are elements that contain html that reads 'Submit' & 'Login'
        cy.contains("Submit");
        cy.contains("Login");

        cy.get('button').should('be.disabled');
        
        //Get input-flds, type into them and verify that the value has been updated
        cy.get('input[name="first"]').type("John");
        cy.get('input[name="last"]').type("Doe");
        cy.get('input[name="email"]').type("john.doe@example.com");
        cy.get('input[name="pass"]').type("qwert");
        
        cy.get('button').should('be.disabled');
    });
});
