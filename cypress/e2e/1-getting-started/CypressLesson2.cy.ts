describe('ToDo Screen Tests', () => {
    const selectors = {
        todoListItems: '.todo-list li',
        newTodoInput: '[data-test="new-todo"]',
        clearCompletedButton: '.clear-completed',
    };

    const groceryList = ["Buy milk", "Read book", "Write tests"];

    function clearAllTodos() {
        cy.get(selectors.todoListItems).then(($items) => {
            if (!$items.length) {
                cy.log('No todos to clear');
                return;
            }

            cy.log('Check all to dos')
            cy.wrap($items).each(($li) => {
                cy.wrap($li).find('input[type="checkbox"]').check();
            });

            cy.log('Clearing all completed items');
            cy.get(selectors.clearCompletedButton).click();

            cy.log('Double check if the items are deleted if not delete with cross button')
            cy.get(selectors.todoListItems).then(($remaining) => {
                if ($remaining.length) {
                    cy.wrap($remaining).each(($li) => {
                        cy.wrap($li).find('button').click({ force: true });
                    });
                }
            });
        });
    }

    function addTodos(items) {
        items.forEach((item) => {
            cy.get(selectors.newTodoInput).type(`${item}{enter}`);
        });
    }

    function assertTodos(items) {
        cy.get(selectors.todoListItems).should('have.length', items.length);

        cy.get(selectors.todoListItems).each(($el, index) => {
            cy.wrap($el)
                .should('contain.text', items[index])
                .and('exist')
                .and('be.visible');
        });
    }

    function completeTodos() {
        cy.get(selectors.todoListItems).each(($el) => {
            const checkbox = () => cy.wrap($el).find('input[type="checkbox"]');
            checkbox().should('not.be.checked');
            checkbox().check();
            checkbox().should('be.checked');
        });
    }

    function clickClearCompletedIfExists() {
        cy.get('body').then(($body) => {
            if ($body.find(selectors.clearCompletedButton).length) {
                cy.get(selectors.clearCompletedButton).click();
            }
        });
    }

    beforeEach(() => {
        cy.visit('/todo');
        clearAllTodos();
    });

    it('add to do items', () => {
        addTodos(groceryList);
        assertTodos(groceryList);
        completeTodos();
        clickClearCompletedIfExists();
        cy.get(selectors.todoListItems).should('have.length', 0);
    });
});
