//Classroom work

describe("Do test to do", () => {
  before("visit website", () => {
    cy.visit("/todo");
  });

  it("Create new to do", () => {
    cy.get('[data-test="new-todo"]').type("new to do");
    cy.get('[data-test="new-todo"]').type("{enter}");
    cy.get("li")
      .contains("new to do")
      .should("exist")
      .and("be.visible")
      .and("have.text", "new to do");

    cy.contains("li", "new to do").find("button").click({ force: true });

    cy.contains("li", "new to do").should("not.exist");
  });
});
