import "cypress-xpath";

describe("ToDo Screen Tests", () => {
  const selectors = {
    todoListItems: ".todo-list li",
    newTodoInput: '[data-test="new-todo"]',
    clearCompletedButton: ".clear-completed",
  };

  const todos = [
    "Pay bills",
    "Clean room",
    "Submit report",
    "Call mom",
    "Book flight",
  ];

  beforeEach(() => {
    cy.visit("https://example.cypress.io/todo");
    cy.deleteTodos(selectors.todoListItems, selectors.clearCompletedButton);
  });

  it("adds todos, marks some as completed, and verifies filters", () => {
    // ➕ Add todos
    todos.forEach((todo) => {
      cy.get(selectors.newTodoInput).type(`${todo}{enter}`);
    });

    // ✅ Assert all todos exist once after adding
    cy.get(selectors.todoListItems).should("have.length", todos.length);
    cy.get(selectors.todoListItems).each(($todo, index) => {
      cy.wrap($todo)
        .should("exist")
        .and("be.visible")
        .and("contain.text", todos[index]);
    });

    //☑️ Mark Some as Completed:
    cy.get(`${selectors.todoListItems} input[type="checkbox"]`).eq(0).check();
    cy.get(`${selectors.todoListItems} input[type="checkbox"]`).eq(1).check();

    //🔍 Verify Completed Section:
    cy.xpath("//*[contains(text(), 'Completed')]").click();
    cy.get(selectors.todoListItems).should("have.length", 2);
    todos.slice(0, 2).forEach((todo) => {
      cy.contains(selectors.todoListItems, todo).should("be.visible");
    });

    //🔎 Verify Active Section:
    cy.xpath("//*[contains(text(), 'Active')]").click();
    cy.get(selectors.todoListItems).should("have.length", 3);
    todos.slice(2).forEach((todo) => {
      cy.contains(selectors.todoListItems, todo).should("be.visible");
    });
  });
});
