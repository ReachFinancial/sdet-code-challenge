import { test, expect } from '../fixture';

// Test case #2
// Given I have created a todo item
// When I edit a todo item
// Then the todo item gets updated with the new changes

const taskText = 'default existing task';

test.beforeEach(async ({ todoMvc }) => {
    await todoMvc.goto();
    await todoMvc.createNewTodo(taskText);
});

test.describe('Edit Existing Todo', () => {
    test('should update todo with new changes', async ({ todoMvc }) => {
        // check task exists with default text
        await expect(todoMvc.allTodos.last()).toHaveText(taskText);

        // grab task by text and edit contents
        await todoMvc.editExistingTaskByText(taskText, 'newly edited task');

        // assert old text is gone, new text is present
        await expect(todoMvc.allTodos.last()).not.toHaveText(taskText);
        await expect(todoMvc.allTodos.last()).toHaveText('newly edited task');
    });
});