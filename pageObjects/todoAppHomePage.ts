import { test, expect, Page } from '@playwright/test';

// Page object for the todo app homepage
export class TodoAppHomePage {
  constructor(private readonly page: Page) {};
  // Page elements
  async visit() {
    await this.page.goto('/examples/react/#/');
  };

  get newTodoInput() {
    return this.page.locator('input.new-todo');
  };

  get todoCounterText() {
    return this.page.locator('span.todo-count');
  };
  
  get todoList() {
    return this.page.locator('ul.todo-list li');
  };

  // Page actions 
  async addNewTodoItem(todo: string) {
    await this.newTodoInput.fill(todo);
    await this.newTodoInput.press('Enter');
  };
};