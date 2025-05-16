describe("Login flow test suite", () => {
  it("should show login successfully", () => {
    // 1. Visit https://mcw-de.purlin.tech/
    cy.visit("https://mcw-de.purlin.tech/");

    //    - The app will redirect to a different origin for authentication.
    //    - Use `cy.origin()` to handle cross-origin actions.
    cy.origin("https://elliman.auth.purlin.tech/", () => {
      const emailTests = [
        // 2a. Submit the form without entering an email
        { input: "", error: "Email is required." },

        // 2b. Enter an invalid email format
        {
          input: "abc",
          error: "This email address is invalid. Please try again.",
        },

        // 2c. Enter a well-formed email that is NOT registered
        {
          input: "onore_de_balsak@gmail.com",
          error: "Account with this email doesn't exist.",
        },
      ];

      // Loop through email validation scenarios
      emailTests.forEach(({ input, error }) => {
        if (!input) {
          // Submit form with no email input
          cy.get("form").submit();
        } else {
          // Enter the test email and submit the form
          cy.get("#email").clear();
          cy.get("#email").type(input);
          cy.get("form").submit();
        }

        // Assert correct error message is shown
        cy.get(".smallParagraph").should("contain", error);

        // Assert that the password field does NOT exist
        cy.get("#password").should("not.exist");
      });

      // 2d. Enter a valid and registered email address
      cy.get("#email").clear();
      cy.get("#email").type("rubina_s+700@purlin.com");
      cy.get("form").submit();

      // Assert that the password field is now visible
      cy.get("#password").should("exist");

      // 3a. Leave the password field empty and submit
      cy.get("form").submit();
      cy.get(".smallParagraph").should("contain", "Password is required.");

      // 3b. Enter an incorrect password and submit
      cy.get("#password").type("rubinaaa777");
      cy.get("form").submit();
      cy.get(".smallParagraph").should(
        "contain",
        "Incorrect password. Please try again.",
      );

      // 3c. Enter the correct password and submit
      cy.get("#password").clear();
      cy.get("#password").type("Rubina5!");
      cy.get("form").submit();
    });

    // 3c (continued): Assert that the user is redirected back to the original domain
    //     - Use `cy.url()` to check that the URL includes the original domain
    cy.url().then((url) => {
      expect(url).to.include("https://mcw-de.purlin.tech/");
    });
  });
});
