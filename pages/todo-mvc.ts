import { type Locator, type Page } from '@playwright/test';

export class TodoMvc {
    readonly page: Page;
    readonly newTodoInput: Locator;
    readonly allTodos: Locator;
    readonly allTasksLink: Locator;
    readonly activeTasksLink: Locator;
    readonly completedTasksLink: Locator;
    readonly clearCompletedTasksLink: Locator;
  
    constructor(page: Page) {
      this.page = page;
      this.newTodoInput = page.getByPlaceholder('What needs to be done?');
      this.allTodos = page.locator('.todo-list').getByRole('listitem');
      this.allTasksLink = page.getByRole('link', { name: 'All' });
      this.activeTasksLink = page.getByRole('link', { name: 'Active' });
      this.completedTasksLink = page.getByRole('link', { name: 'Completed' });
      this.clearCompletedTasksLink = page.getByRole('button', { name: 'Clear completed' });
    }

    getTodoByText(task: string) {
      return this.allTodos.filter({ hasText: task });
    }
  
    async goto() {
      await this.page.goto('https://todomvc.com/examples/react/#/');
    }

    async createNewTodo(task: string) {
      await this.newTodoInput.fill(task);
      await this.newTodoInput.press('Enter');
    }

    async editExistingTaskByText(task: string, appendText: string) {
      const todo = this.getTodoByText(task);
      await todo.dblclick();
      await todo.getByRole('textbox').fill(appendText);
      await todo.press('Enter');
    }

    async deleteLastTask() {
      await this.allTodos.last().hover();
      await this.allTodos.last().getByRole('button', { name: '×' }).click();
    }

    async completeTaskByText(task: string) {
      await this.getTodoByText(task).getByRole('checkbox').setChecked(true);
    }

    async clickClearCompletedLink() {
      await this.clearCompletedTasksLink.click();
    }
  }