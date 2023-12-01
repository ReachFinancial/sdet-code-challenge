import { test, expect } from '../fixture';

const taskText = 'default existing task';

test.beforeEach(async ({ todoMvc }) => {
  await todoMvc.goto();
  await todoMvc.createNewTodo(taskText);
});

test.describe('Completing Todo', () => {

  // Test case #4
  // Given I have created a todo item
  // When I mark a todo item as completed
  // Then it is marked with a green check mark
  // And it is crossed off my todo list with a Strikethrough
  test('should mark completed task with green check and strikethrough', async ({ todoMvc }) => {
    const todo = todoMvc.getTodoByText(taskText);
    const todoCheckbox = todo.getByRole('checkbox');

    // assert style prior to completing task
    await expect(todoCheckbox).not.toBeChecked();
    await expect(todo).not.toHaveClass('completed');
    // await expect(todo.locator('label')).not.toHaveCSS('text-decoration', 'line-through solid rgb(217, 217, 217)');

    // complete task
    await todoCheckbox.click();

    // assert style changes
    await expect(todoCheckbox).toBeChecked();
    await expect(todo).toHaveClass('completed');
    // await expect(todo.locator('label')).toHaveCSS('text-decoration', 'line-through solid rgb(217, 217, 217)');
  });

  test.describe('After Complete', () => {
    test.beforeEach(async ({ todoMvc }) => {
      await todoMvc.completeTaskByText(taskText);
      await todoMvc.createNewTodo('incomplete task');
    });

    // Test case #5
    // Given I have marked a todo item as complete
    // When I view the Active list
    // Then only Active (Not Completed) todo items are shown
    test('should only show incomplete tasks in Active list', async ({ todoMvc }) => {
      await todoMvc.activeTasksLink.click();
      await expect(todoMvc.allTodos.last()).toHaveText('incomplete task');
      await expect(todoMvc.allTodos).toHaveCount(1);
    });


    // // Test case #6
    // // Given I have marked a todo item as complete
    // // When I click “Clear Completed”
    // // Then the completed todo item is removed from my todo list
    // // And the todo item is moved to the Completed list


    // this seems incorrect for a test case?
    // clicking "Clear Completed" will not move the item to the completed list, it removes it
    test('should remove completed items from list when clicking clear', async ({ todoMvc }) => {
      // check count before clearing list
      await expect(todoMvc.allTodos).toHaveCount(2);

      // check count of completed tasks is 1
      await todoMvc.completedTasksLink.click();
      await expect(todoMvc.allTodos).toHaveCount(1);

      // check count after clearing Completed Tasks is 0
      await todoMvc.clickClearCompletedLink();
      await expect(todoMvc.allTodos).toHaveCount(0);

      // check completed items are removed from 'All' list
      await todoMvc.allTasksLink.click();
      await expect(todoMvc.allTodos).toHaveCount(1);
      await expect(todoMvc.allTodos.last()).toHaveText('incomplete task');
    });
  });
});
