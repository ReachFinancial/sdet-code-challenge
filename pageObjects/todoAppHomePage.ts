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

  get firstCompletedCheckbox() {
    return this.page.locator('ul.todo-list li.completed input').first();
  };

  get redButtonX() {
    return this.page.locator('button.destroy');
  };

  get activeLink() {
    return this.page.getByRole('link', { name: 'Active' });
  };

  get clearCompletedLink() {
    return this.page.getByRole('button', { name: 'Clear completed' });
  };

  get completedLink() {
    return this.page.getByRole('link', { name: 'Completed' });
  };

  get toggleAllLabel() {
    return this.page.locator('.main label[for="toggle-all"]');
  };

  // Page actions 
  async addNewTodoItem(todo: string) {
    await this.newTodoInput.fill(todo);
    await this.newTodoInput.press('Enter');
  };

  async editFirstTodoItem(updateText: string) {
    await this.todoList.first().dblclick();
    await this.todoList.first().first().type(updateText);
    await this.todoList.first().first().press('Enter');
  };

  async clickOnRedButtonX() {
    await this.page.mouse.move(1013, 218); // since element is hidden, move the mouse to it 
    await this.redButtonX.click();
  }

  async clickOnCompleteCheckBoxOfTodoItem(todoItem: string) {
    await this.page.getByRole('listitem').filter({ hasText: todoItem }).getByRole('checkbox').check();
  };

  async clickOnToggleAllLable() {
    await this.toggleAllLabel.hover();
    await this.toggleAllLabel.click({ force: true });
  }
};
