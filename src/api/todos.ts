export interface Todo {
  id: number
  todo: string
  completed: boolean
  userId: number
}

export interface TodosResponse {
  todos: Array<Todo>
  total: number
  skip: number
  limit: number
}

export interface CreateTodoRequest {
  todo: string
  completed: boolean
  userId: number
}

export interface UpdateTodoRequest {
  todo?: string
  completed?: boolean
  userId?: number
}

export interface DeleteTodoResponse extends Todo {
  isDeleted: boolean
  deletedOn: string
}

const BASE_URL = 'https://dummyjson.com/todos'

export const todosApi = {
  // Get all todos with pagination
  async getAllTodos(
    limit: number = 30,
    skip: number = 0,
  ): Promise<TodosResponse> {
    const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`)
    if (!response.ok) {
      throw new Error(`Error fetching todos: ${response.statusText}`)
    }
    return response.json()
  },

  // Get a single todo by ID
  async getTodoById(id: number): Promise<Todo> {
    const response = await fetch(`${BASE_URL}/${id}`)
    if (!response.ok) {
      throw new Error(`Error fetching todo: ${response.statusText}`)
    }
    return response.json()
  },

  // Get a random todo
  async getRandomTodo(): Promise<Todo> {
    const response = await fetch(`${BASE_URL}/random`)
    if (!response.ok) {
      throw new Error(`Error fetching random todo: ${response.statusText}`)
    }
    return response.json()
  },

  // Get todos by user ID
  async getTodosByUserId(userId: number): Promise<TodosResponse> {
    const response = await fetch(`${BASE_URL}/user/${userId}`)
    if (!response.ok) {
      throw new Error(`Error fetching user todos: ${response.statusText}`)
    }
    return response.json()
  },

  // Create a new todo
  async createTodo(todoData: CreateTodoRequest): Promise<Todo> {
    const response = await fetch(`${BASE_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    })
    if (!response.ok) {
      throw new Error(`Error creating todo: ${response.statusText}`)
    }
    return response.json()
  },

  // Update a todo
  async updateTodo(id: number, todoData: UpdateTodoRequest): Promise<Todo> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    })
    if (!response.ok) {
      throw new Error(`Error updating todo: ${response.statusText}`)
    }
    return response.json()
  },

  // Delete a todo
  async deleteTodo(id: number): Promise<DeleteTodoResponse> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error(`Error deleting todo: ${response.statusText}`)
    }
    return response.json()
  },
}
