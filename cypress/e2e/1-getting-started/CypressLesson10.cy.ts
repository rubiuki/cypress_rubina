import { ClientProfilePage } from "../../Pages/ClientProfilePage";
import { ClientPreferencesPage } from "../../Pages/ClientPreferencesPage";

describe("Client Profile & Preference Page Elements", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.intercept("GET", "https://mc-api.purlin.tech/v1.0/recommendations").as(
      "recommendations_request",
    );

    cy.origin("https://elliman.auth.purlin.tech/", () => {
      cy.get("#email").type("rubina_s+700@purlin.com");
      cy.get("form").submit();
      cy.get("#password").should("exist").type("Rubina5!");
      cy.get("form").submit();
    });
    
    cy.wait("@recommendations_request");
  });

  it("Go through important selectors on client profile page", () => {
    cy.visit("/account?tab=profile");

    ClientProfilePage.profileSectionTitle();
    ClientProfilePage.clientImage();
    ClientProfilePage.clientImageUploadButton();
    ClientProfilePage.clientAgentBlock();
    ClientProfilePage.clientFirstNameInput();
    ClientProfilePage.clientLastNameInput();
    ClientProfilePage.clientEmailInput();
    ClientProfilePage.clientPhoneNumberInput();
    ClientProfilePage.saveProfileChangesButton();
    ClientProfilePage.deleteClientProfileBlock();
  });

  it("Go through important selectors on client preferences page", () => {
    cy.visit("/account?tab=preferences");
    ClientPreferencesPage.preferencesSectionTitle();
    ClientPreferencesPage.preferredLocationInput();
    ClientPreferencesPage.addPreferredLocationButton();
    ClientPreferencesPage.budgetInput();
    ClientPreferencesPage.homeTypeDropdown();
    ClientPreferencesPage.styleDropdown();
    ClientPreferencesPage.featuresSearchInput();
    ClientPreferencesPage.schoolDropdown();
    ClientPreferencesPage.bedroomsDropdown();
    ClientPreferencesPage.bathroomsDropdown();
    ClientPreferencesPage.estimatedOrDesiredClosingDateInput();
    ClientPreferencesPage.savePreferenceChangesButton();
  });
});
