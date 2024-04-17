import { test, expect, type Page } from '@playwright/test';
import { checkNumberOfCompletedTodosInLocalStorage, checkNumberOfTodosInLocalStorage, checkTodosInLocalStorage } from '../src/todo-app'
import { TodoPage } from '../pages/TodoPage';


const TODO_ITEMS = [
  'complete code challenge for reach',
  'ensure coverage for all items is automated'
];

test.describe('Create New Todo', () => {

  let todoPage: TodoPage

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page)
    await todoPage.goto()
    await todoPage.createTodos(TODO_ITEMS)
  })

  test('should be able to create new items on the page', async ({ page }) => {
    const count = await todoPage.countTodos()
    await expect(todoPage.todoList.nth(count - 1)).toHaveText(TODO_ITEMS[TODO_ITEMS.length-1])
  });

  test('should be able to edit a todo item', async({page}) => {
    const newText = 'updated task - complete code challenge for reach'

    const updatedTodo = await todoPage.editTodoItem(newText)
    await expect(updatedTodo).toHaveText(newText)
  })

  test('should delete a todo item from the list', async ({ page }) => {
    await todoPage.deleteTodoItem(0) 
    const count = await todoPage.countTodos()
    expect(count).toBe(1) 
  })

  test('marking a todo item as completed shows with a green mark', async({page}) => {
    const completedItem = await todoPage.toggleTodoCompletion(0)
    await expect(completedItem).toHaveClass(/completed/)
    const label = completedItem.locator('[data-testid="todo-item-label"]')
    expect(label).toHaveCSS('text-decoration-line', 'line-through')
  })

  test('should show only active items', async({page}) => {
    await todoPage.toggleTodoCompletion(0)
    await todoPage.clickFilter('Active')
    const count = await todoPage.countTodos()
    expect(count).toBe(1)
  })

  test('should remove completed items from the todo list', async({page}) => {
    await todoPage.toggleTodoCompletion(0)
    await todoPage.clearCompleted()
    await todoPage.clickFilter('Completed')
    const count = await todoPage.countTodos()
    expect(count).toBe(0)
  })
});
