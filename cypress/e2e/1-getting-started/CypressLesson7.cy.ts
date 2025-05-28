describe("Cypress Profile Update Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.origin("https://elliman.auth.purlin.tech/", () => {
      cy.get("#email").type("rubina_s+700@purlin.com");
      cy.get("form").submit();
      cy.get("#password").should("exist");
      cy.get("#password").type("Rubina5!");
      cy.get("form").submit();
    });
  });

  it("should display and update profile fields correctly", () => {
    const userData = [
      {
        field: "First name",
        value: "Rubina",
        newValue: "Ruby",
        editable: true,
      },
      {
        field: "Last name",
        value: "Buyer",
        newValue: "Sukiasyan",
        editable: true,
      },
      {
        field: "example@test.com",
        value: "rubina_s+700@purlin.com",
        newValue: "rubina_s+700@purlin.com",
        editable: false,
      },
      {
        field: "(xxx) xxx-xxxx",
        value: "(077) 502-766 ",
        newValue: "(041) 502-766 ",
        editable: true,
      },
    ];

    function assertUserData(field, value) {
      cy.get(`input[placeholder="${field}"]`).then(($data) => {
        expect($data).to.have.attr("value", value);
      });
    }

    cy.visit("https://mcw-de.purlin.tech/account?tab=profile");

    //Assert the initial values
    userData.forEach((data) => {
      assertUserData(data.field, data.value);
    });

    //Assigning new values and asserting them
    userData.forEach((data) => {
      if (data.editable) {
        cy.get(`input[placeholder="${data.field}"]`)
          .clear()
          .type(data.newValue)
          .then(($input) => {
            expect($input).to.have.attr("value", data.newValue);
          });
      }
    });

    cy.get(`p[data-tooltip-content="Save changes"]`).click();
    cy.contains("p", "Changes saved successfully.").should("be.visible");
    cy.reload();

    //Assert that the updates are successfully saved
    userData.forEach((data) => {
      assertUserData(data.field, data.newValue);
    });
  });
});
