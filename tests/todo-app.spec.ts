import { test, expect, type Page } from '@playwright/test';
import { checkNumberOfCompletedTodosInLocalStorage, checkNumberOfTodosInLocalStorage, checkTodosInLocalStorage } from '../src/todo-app';
import { TodoAppHomePage } from '../pageObjects/todoAppHomePage';

test.beforeEach(async ({ page }) => {
    // Visit todo app Homepage
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
    await todoAppHomePage.editFirstTodoItem(' updated');

    // Verify the todo update is updated with the new changes
    await expect(todoAppHomePage.todoList.first()).toContainText('updated');
    await checkTodosInLocalStorage(page, TODO_ITEMS[0] + ' updated');
  });

  test('TC-3 Should delete todo item when using the red X', async ({ page }) => {
    const todoAppHomePage = new TodoAppHomePage(page);

    // Create first todo item
    await todoAppHomePage.addNewTodoItem(TODO_ITEMS[0]);
    await expect(todoAppHomePage.todoList).toHaveCount(1);

    // Delete todo item by using the red X
    await todoAppHomePage.clickOnRedButtonX();

    // Verify todo list is empty
    await expect(todoAppHomePage.todoList).toHaveCount(0);
    await checkNumberOfTodosInLocalStorage(page, 0);
  });

  test('TC-4 Should mark todo item with a green check mark and struck through when user marks it as complete', async ({ page }) => {
    const todoAppHomePage = new TodoAppHomePage(page);

    // Create first todo item
    await todoAppHomePage.addNewTodoItem(TODO_ITEMS[0]);
    await expect(todoAppHomePage.todoList).toHaveCount(1);

    // Mark specific todo item as complete
    await todoAppHomePage.clickOnCompleteCheckBoxOfTodoItem(TODO_ITEMS[0]);

    // Verify green checkmark is displayed and todo is struck through (Visual QA)
    await expect(todoAppHomePage.todoList.first()).toBeVisible()
    await expect(todoAppHomePage.todoList.first()).toHaveScreenshot('greenCheckAndStrikeThrough.png');

    // Verify todo item is completed and checked
    await expect(todoAppHomePage.firstCompletedCheckbox).toBeChecked();
    await expect(todoAppHomePage.todoCounterText).toHaveText('0 items left');
    await checkNumberOfTodosInLocalStorage(page, 1);
  });

  test('TC-5 Should only display Active (Not Completed) todos in the Active list', async ({ page }) => {
    const todoAppHomePage = new TodoAppHomePage(page);

    // Create 2 todos items
    await todoAppHomePage.addNewTodoItem(TODO_ITEMS[1]);
    await todoAppHomePage.addNewTodoItem(TODO_ITEMS[0]);
    await expect(todoAppHomePage.todoList).toHaveCount(2);

    // Mark specific todo item as complete and click on the active link
    await todoAppHomePage.clickOnCompleteCheckBoxOfTodoItem(TODO_ITEMS[1]);
    await todoAppHomePage.activeLink.click();

    // Verify active list only displays Active todos
    await expect(todoAppHomePage.todoCounterText).toHaveText('1 item left');
    await expect(todoAppHomePage.todoList).toHaveCount(1);
    await expect(todoAppHomePage.todoList.first()).toContainText(TODO_ITEMS[0])
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);
  });
});
