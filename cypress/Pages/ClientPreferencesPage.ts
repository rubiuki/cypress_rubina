export class ClientPreferencesPage {
  static preferencesSectionTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get("h6");
  }

  static preferredLocationInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get("[name='locations']");
  }

  static addPreferredLocationButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-tooltip-content="Add location"]');
  }

  static budgetInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[name="budget"]');
  }

  static homeTypeDropdown(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains("span", "Home type").parent("div").next("div");
  }

  static styleDropdown(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains("span", "Style").parent("div").next("div");
  }

  static featuresSearchInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[placeholder="Tags"]');
  }

  static schoolDropdown(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .contains("span", /^School$/)
      .parent()
      .next();
  }

  static bedroomsDropdown(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains("span", "Bedrooms").parent().next();
  }

  static bathroomsDropdown(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains("span", "Bathrooms").parent().next();
  }

  static estimatedOrDesiredClosingDateInput(): Cypress.Chainable<
    JQuery<HTMLElement>
  > {
    return cy.get('[placeholder="Month DD, YYYY"]');
  }

  static savePreferenceChangesButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-tooltip-content="Save changes"]');
  }
}
