import { test, expect } from '../fixture';

// Test case #3
// Given I have created a todo item
// When I delete a todo item using the red X
// Then the todo item is removed from my todo list

test.beforeEach(async ({ todoMvc }) => {
    await todoMvc.goto();
    await todoMvc.createNewTodo('this will be deleted');
});

test.describe('Delete Existing Todo', () => {
    test('should remove deleted todos from list', async ({ todoMvc }) => {
        // check 1 item exists
        await expect(todoMvc.allTodos).toHaveCount(1);
        
        // delete item from list
        await todoMvc.deleteLastTask();

        // assert no items exist
        await expect(todoMvc.allTodos).toHaveCount(0);
    });
});