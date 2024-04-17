import {Page, Locator} from "@playwright/test"

export class TodoPage {
    readonly page: Page
    readonly newTodoInput: Locator
    readonly todoList: Locator

    constructor(page: Page) {
        this.page = page
        this.newTodoInput = page.locator('[data-testid="text-input"]')
        this.todoList = page.locator('.todo-list li')
    }

    async goto() {
        await this.page.goto('https://todomvc.com/examples/react/dist/')
    }

    async createTodos(todoItems: string[]) {
        await this.newTodoInput.click()
        for (const item of todoItems) {
            await this.newTodoInput.fill(item)
            await this.newTodoInput.press('Enter')
            await this.page.waitForSelector(`text=${item}`)
        }
    }

    async editTodoItem(newText: string) {
        const firstTodoItem = this.todoList.first()
        const firstLabel = firstTodoItem.locator('[data-testid="todo-item-label"]')
        await firstLabel.dblclick()
        const editInput = firstTodoItem.locator('input[type="text"]:visible')
        if (await editInput.isVisible()) {
            await editInput.fill(newText)
            await editInput.press('Enter')
            return firstLabel  
        } else {
            throw new Error('Input field did not appear upon label double-click')
        }
    }

    async countTodos() {
        return this.todoList.count()
    }
}