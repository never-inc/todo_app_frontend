const baseUrl = process.env.NEXT_PUBLIC_REST_API_BASE_URL

export const fetchTodoList = async (accessToken: string): Promise<{ [key: string]: any }> => {
  const url = `${baseUrl}/todos/`
  const bearerToken = `Bearer ${accessToken}`
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: bearerToken,
    },
  })
  console.log(res)
  const body = await res.json()
  return body
}

export const fetchTodo = async (accessToken: string, todoId: string): Promise<{ [key: string]: any }> => {
  const url = `${baseUrl}/todos/${todoId}`
  const bearerToken = `Bearer ${accessToken}`
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: bearerToken,
    },
  })
  console.log(res)
  const body = await res.json()
  return body
}

export const postTodo = async (
  accessToken: string,
  todoId: string,
  todoText: string,
): Promise<{ [key: string]: any }> => {
  const url = `${baseUrl}/todos/${todoId}`
  const bearerToken = `Bearer ${accessToken}`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: bearerToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ todoText: todoText }),
  })
  console.log(res)
  const body = await res.json()
  return body
}

export const deleteTodo = async (accessToken: string, todoId: string): Promise<{ [key: string]: any }> => {
  const url = `${baseUrl}/todos/${todoId}`
  const bearerToken = `Bearer ${accessToken}`
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: bearerToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ todoId: todoId }),
  })
  console.log(res)
  const body = await res.json()
  return body
}
