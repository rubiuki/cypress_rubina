/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add(
  "deleteTodos",
  (toDoListItems: string, clearCompletedButton: string) => {
    cy.get(toDoListItems).then(($items) => {
      if (!$items.length) {
        cy.log("No todos to clear");
        return;
      }

      cy.log("Check all to dos");
      cy.get(`${toDoListItems} input[type="checkbox"]`).click({
        multiple: true,
      });

      cy.log("Clearing all completed items");
      cy.get(clearCompletedButton).click();

      cy.log(
        "Double check if the items are deleted if not delete with cross button",
      );
      cy.get(toDoListItems).then(($remaining) => {
        if ($remaining.length) {
          cy.get(`${toDoListItems} button`).click({
            force: true,
            multiple: true,
          });
        }
      });
    });
  },
);
