it("uploads image <socialnetwork>", () => {
    cy.fixture("testPic3.png")
        .then(Cypress.Blob.base64StringToBlob)
        .then((fileContent) => {
            cy.get("[data-cy=uploader-file-input]").attachFile({
                fileContent: fileContent,
                fileName: "testPic3.png",
                mimeType: "image/png",
            });
        });
    cy.get("[data-cy=uploader-submit-btn]").click();
    //check whether positive response (If I want to separate upload form display of image)
    cy.wait(10000);
});

it("closes modal when area around uploader is clicked", () => {
    cy.get("[data-cy=uploader-modal]").click(200, 200).should("not.exist");
});

it("displays uploaded image as new profile pic", () => {
    cy.get("[data-cy=profile-page-userpic]")
        .should("have.attr", "src")
        .should("include", "https://");
});

it("opens bio-editor on click", () => {
    cy.get("[data-cy=add-bio-btn]").click();
    cy.get("[data-cy=profile-page-bio-editor]").should("exist");
});
