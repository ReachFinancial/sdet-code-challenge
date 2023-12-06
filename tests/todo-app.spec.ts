import { test, expect, type Page } from '@playwright/test';
import { checkNumberOfCompletedTodosInLocalStorage, checkNumberOfTodosInLocalStorage, checkTodosInLocalStorage } from '../src/todo-app'
import { TodoAppHomePage } from '../pageObjects/todoAppHomePage';

test.beforeEach(async ({ page }) => {
    // Visit todo Homepage
    await new TodoAppHomePage(page).visit();
});

const TODO_ITEMS = [
  'Complete code challenge for reach Financial',
  'Ensure coverage for all items is automated'
];

test.describe('Test Suite for todo mvc app', () => {
  test('TC-1 Should display new todo item when user creates it', async ({ page }) => {
    const todoAppHomePage = new TodoAppHomePage(page);

    // Create first todo item
    await todoAppHomePage.addNewTodoItem(TODO_ITEMS[0]);

    // Make sure the list only has one todo item and it is visible
    await expect(todoAppHomePage.todoCounterText).toHaveText('1 item left');
    await expect(page.getByText(TODO_ITEMS[0])).toBeVisible();

    // Add another todo
    await todoAppHomePage.addNewTodoItem(TODO_ITEMS[1]);

    // Verify the list now has two todo items and both are displayed
    await expect(todoAppHomePage.todoCounterText).toHaveText('2 items left');
    await expect(todoAppHomePage.todoList).toHaveCount(2);
    await expect(todoAppHomePage.todoList).toHaveText([
      TODO_ITEMS[0],
      TODO_ITEMS[1]
    ]);
    await checkNumberOfTodosInLocalStorage(page, 2);
    await checkTodosInLocalStorage(page, TODO_ITEMS[0]);
    await checkTodosInLocalStorage(page, TODO_ITEMS[1]);
  });

  test('TC-2 Should update todo item when user edits it', async ({ page }) => {
    const todoAppHomePage = new TodoAppHomePage(page);

    // Create first todo item
    await todoAppHomePage.addNewTodoItem(TODO_ITEMS[0]);

    // Edit the todo item
    await todoAppHomePage.editFirstTodoItem(' updated')

    // Verify the todo update is updated with the new changes
    await expect(todoAppHomePage.todoList.first()).toContainText('updated')
    await checkTodosInLocalStorage(page, TODO_ITEMS[0] + ' updated');
  });
});
