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

    async countTodos() {
        return this.todoList.count()
    }
}