export class ClientProfilePage {
  static profileSectionTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get("h6");
  }

  static clientImage(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get("[class*='Profile_myAccountImgRow']").children().first();
  }

  static clientImageUploadButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get("[class*='Profile_myAccountImgRow']").children().eq(1);
  }

  static clientAgentBlock(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get("[class*='Profile_myAgentBlock']");
  }

  static clientFirstNameInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[placeholder="First name"]');
  }

  static clientLastNameInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[placeholder="Last name"]');
  }

  static clientEmailInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[placeholder="example@test.com"]');
  }

  static clientPhoneNumberInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[placeholder="(xxx) xxx-xxxx"]');
  }

  static saveProfileChangesButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get("[data-tooltip-content='Save changes']");
  }

  static deleteClientProfileBlock(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get("[class*='Profile_myAccountBlockSection']").children().last();
  }
}
