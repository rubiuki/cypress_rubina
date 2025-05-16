declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Deletes all todos given a selector.
     * @param toDoListItems The selector string to target todo list items
     * @param clearCompletedButton The selector string to clear all completed todos
     */
    deleteTodos(
      toDoListItems: string,
      clearCompletedButton: string,
    ): Chainable<void>;
  }
}
