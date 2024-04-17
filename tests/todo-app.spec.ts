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
    console.log("count")
    await expect(todoPage.todoList.nth(count - 1)).toHaveText(TODO_ITEMS[TODO_ITEMS.length-1])
  });

  test('should be able to edit a todo item', async({page}) => {
    const newText = 'updated task - complete code challenge for reach'

    const updatedTodo = await todoPage.editTodoItem(newText)
    await expect(updatedTodo).toHaveText(newText)
  })
});
