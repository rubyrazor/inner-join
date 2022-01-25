describe("The Browser", () => {
    it("has no cookies", () => {
        cy.clearCookies("session", "session.sig");
    });
});

//
// REGISTRATION PAGE
describe("The Registration Page", () => {
    Cypress.Cookies.defaults({ preserve: ["session", "session.sig"] });
    Cypress.Cookies.debug(true);

    it("successfully loads,", () => {
        cy.visit("/");
    });

    it("enables the submit button if required input is provided", () => {
        cy.get("[data-cy=registration-page-submit-btn]").should("be.disabled");
        cy.get('input[name="first"]').type("Jane").should("have.value", "Jane");
        cy.get("[data-cy=registration-page-submit-btn]").should("be.disabled");
        cy.get('input[name="last"]').type("Doe").should("have.value", "Doe");
        cy.get("[data-cy=registration-page-submit-btn]").should("be.disabled");
        cy.get('input[name="email"]')
            .type("jane.doe@example.com")
            .should("have.value", "jane.doe@example.com");
        cy.get("[data-cy=registration-page-submit-btn]").should("be.disabled");
        cy.get('input[name="pass"]')
            .type("qwert")
            .should("have.value", "qwert");
        cy.get("[data-cy=registration-page-submit-btn]").should("be.enabled");
    });

    it("registers user and routes to profile page if submit button is clicked", () => {
        cy.get("[data-cy=registration-page-submit-btn]").click();
    });
});

//
//PROFILE PAGE
describe("The Profile Page", () => {
    it("displays default-image, username and bio correctly", () => {
        cy.get("[data-cy=profile-page-username]").should(
            "have.text",
            "Jane Doe"
        );
        cy.get("[data-cy=profile-page-userpic]")
            .should("have.attr", "src")
            .should("include", "/default.png");

        cy.get("[data-cy=profile-page-bio]").should("have.text", "");
    });

    it("opens modal when image is clicked", () => {
        cy.get(".bigProfilePic").click();
        cy.get("[data-cy=uploader-modal]").should("be.visible");
    });

    //UPLOADER
    it("uploads image", () => {
        cy.fixture("jane-doe.png")
            .then(Cypress.Blob.base64StringToBlob)
            .then((fileContent) => {
                cy.get("[data-cy=uploader-file-input]").attachFile({
                    fileContent: fileContent,
                    fileName: "jane-doe.png",
                    mimeType: "image/png",
                });
            });
        cy.get("[data-cy=uploader-submit-btn]").click();
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

    it("opens bio-editor when clicking 'Add Bio'-button", () => {
        cy.get("[data-cy=add-bio-btn]").click();
        cy.get("[data-cy=profile-page-bio-editor]").should("exist");
    });

    //BIO-EDITOR
    const bio1 =
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.";
    const bio2 =
        "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.";

    it("allows to add bio", () => {
        cy.get("[data-cy=profile-page-bio-editor]")
            .type(bio1)
            .should("have.value", bio1);
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

// FIND PAGE
describe("The Find Page", () => {
    it("successfully opens", () => {
        cy.get("[data-cy=find-people-btn]").click();
        cy.url().should("include", "users");
        cy.get("[data-cy=found-people-container]")
            .children()
            .should("have.length", 4);
        cy.wait(500);
    });

    it("searches for users and displays them correctly", () => {
        cy.get("[data-cy=friends-search-fld]").type("a");
        cy.get("[data-cy=other-user-names]").contains("A"); //#2
        cy.wait(500);
    });
});

//
// FRIENDS AND WANNABES PAGE
describe("The Friends and Wannabes Page", () => {
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

//
// CHAT PAGE
describe("The Chat Page", () => {
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
    });
});

describe("The Login Page", () => {
    it("loads successfully", () => {
        cy.get("[data-cy=login-btn]").click();
        cy.url().should("include", "login");
    });

    it("and login works", () => {
        cy.get("input[name=email]").type("jane.doe@example.com");
        cy.get("input[name=pass]").type("qwert");
        cy.get("[data-cy=login-submit-btn]").click();
    });

    it("and logs out again.", () => {
        cy.get("[data-cy=logout-btn]").click();
    });
});

describe("The Reset Password Page", () => {
    it("loads successfully", () => {
        cy.get("[data-cy=login-btn]").click();
        cy.get("[data-cy=login-reset-btn]").click();
        cy.url().should("include", "reset");
    });

    it("enters new password and verification code successfully", () => {
        cy.get("input[name=email]").type("jane.doe@example.com");
        cy.get("[data-cy=reset-submit-btn]").click();
        cy.get("input[name=newPass]").type("qwert");
        cy.get("input[name=verCode]").type("qwert");
    });

    it("shows error message because wrong verification code was submitted", () => {
        cy.get("[data-cy=verCode-submit-btn]").click();
        cy.get("[data-cy=error-msg]");
    });
});
