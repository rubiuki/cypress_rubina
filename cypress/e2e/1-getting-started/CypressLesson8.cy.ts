describe("Wait for calls to be resolved and assert the response body content ", () => {
  const expectedClientInfo = {
    id: 3318,
    userId: 1112726,
    type: "Buyer",
    firstName: "Rubina",
    lastName: "Buyer",
    fullName: "Rubina Buyer",
    avatar:
      "http://res.cloudinary.com/ddvd5ys2m/image/upload/v1718110985/users/rubina_s%252b700%2540purlin.com/avatar.jpg",
    email: "rubina_s+700@purlin.com",
    phoneNumber: "077502766",
    onboardedPages: [],
    agents: [
      {
        userId: 1081733,
        firstName: "Agatha",
        lastName: "Jenney",
        avatar:
          "http://res.cloudinary.com/douglas-elliman/image/upload/v1/HeadShots/330/il1jpzpvyi0ri8ri4iox",
        email: "agatha.jenney@elliman.com",
        phoneNumber: "5613177186",
        agentType: "Primary",
      },
    ],
    preference: null,
    buyingPower: null,
  };

  const expectedNames = ["Home", "My Agents", "My Workspace"];

  beforeEach(() => {
    cy.visit("/");

    cy.intercept("GET", "/api/theme").as("theme_request");
    cy.intercept("GET", "/api/configs").as("config_request");
    cy.intercept("GET", "https://mc-api.purlin.tech/v1.0/Clients/info").as(
      "client_info_request",
    );
    cy.intercept("GET", "https://mc-api.purlin.tech/v1.0/recommendations").as(
      "recommendations_request",
    );
    cy.intercept(
      "GET",
      "https://mc-api.purlin.tech/v1.0/recommendations/updates",
    ).as("recommendations_updates");

    cy.origin("https://elliman.auth.purlin.tech/", () => {
      cy.get("#email").type("rubina_s+700@purlin.com");
      cy.get("form").submit();
      cy.get("#password").should("exist");
      cy.get("#password").type("Rubina5!");
      cy.get("form").submit();
    });

    cy.wait([
      "@theme_request",
      "@config_request",
      "@recommendations_request",
      "@recommendations_updates",
    ]);
    cy.wait("@client_info_request").then((interception) => {
      cy.wrap(interception).as("clientInfoResponse");
    });
  });

  it("assert that the api calls are resolved and the elements are visible", () => {
    cy.get("header")
      .find("ul p")
      .each(($el, $index) => {
        cy.wrap($el).should("be.visible");
        expect($el.text().trim()).to.equal(expectedNames[$index]);
      });
    cy.get('[class*="AutocompleteInput_searchInput"]').should("be.visible");
    cy.get("@clientInfoResponse").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body).to.deep.equal(expectedClientInfo);
    });
  });
});
