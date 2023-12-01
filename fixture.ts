import { test as base } from '@playwright/test';
import { TodoMvc } from './pages/todo-mvc';

type MyFixtures = {
  todoMvc: TodoMvc;
};

export const test = base.extend<MyFixtures>({
  todoMvc: async ({ page }, use) => {
    await use(new TodoMvc(page));
  },
});

export { expect } from '@playwright/test';