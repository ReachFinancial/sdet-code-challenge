import { test, expect } from '../fixture';

// Test case #1
// Given I am a user of todomvc
// When I create a new todo item
// Then it appears last on my todo list

test.beforeEach(async ({ todoMvc }) => {
  await todoMvc.goto();
});

test.describe('Create New Todo', () => {
  test('should place new todo as last item on list', async ({ todoMvc }) => {
    // create two new items
    await todoMvc.createNewTodo('testing new task');
    await todoMvc.createNewTodo('this is my 2nd item');

    // assert on last item in list
    await expect(todoMvc.allTodos.last()).toHaveText('this is my 2nd item');
  });
});
