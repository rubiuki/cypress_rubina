import { DateTime } from "luxon";

describe("Collections Page – Stubbed API UI Validation", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.origin("https://elliman.auth.purlin.tech/", () => {
      cy.get("#email").type("rubina_s+700@purlin.com");
      cy.get("form").submit();
      cy.get("#password").should("exist").type("Rubina5!");
      cy.get("form").submit();
    });
  });

  it("stubs collections API, verifies UI against mock data", () => {
    // Intercept collections API
    cy.intercept(
      { method: "GET", url: "https://mc-api.purlin.tech/v1.0/collections*" },
      { fixture: "collections.json" },
    ).as("getCollections");

    // Navigate to collections page
    cy.visit("/workspace/collections");

    // Wait for the intercepted call
    cy.wait("@getCollections");

    // Assert collections count
    cy.get("h6").next().should("have.text", "5");

    // Get fixture once for reuse
    cy.fixture("collections.json").then((collections) => {
      const data = collections.data;

      // Assert number of collection cards
      cy.get('[class*="Collections_collectionListings"]')
        .children("div")
        .should("have.length", data.length);

      // Assert collection names
      cy.get('[class*="Collections_collectionListings"]')
        .children("div")
        .find("a p")
        .each(($el, index) => {
          expect($el.text().trim()).to.equal(data[index].name);
        });

      // Assert listing counts
      cy.get('[class*="Collections_collectionListings"]')
        .children("div")
        .each(($div, index) => {
          const count = data[index].listingCount;
          const expectedText = count === 0 ? "0 listing" : `${count} listings`;

          cy.wrap($div)
            .find("span")
            .first()
            .invoke("text")
            .should("equal", expectedText);
        });

      // Assert creation/modification date
      cy.get('[class*="Collections_collectionListings"]')
        .children("div")
        .each(($div, index) => {
          const rawDate = data[index].updateDate || data[index].createDate;
          const formatted = DateTime.fromISO(rawDate)
            .setZone("Asia/Yerevan")
            .toFormat("HH:mm, MMM dd, yyyy");

          cy.wrap($div)
            .find("span")
            .eq(2)
            .invoke("text")
            .should("equal", formatted);
        });
    });
  });
});
