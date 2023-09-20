const baseUrl = process.env.NEXT_PUBLIC_REST_API_BASE_URL

export type QueryResponseType<T, U> = {
  Count: number
  Items: T[]
  LastEvaluatedKey?: U
}

export type TodoType = {
  todoId: string
  userId: string
  todoText: string
  createdAt: string
  updatedAt: string
}
export type TodoLastEvaluatedKey = {
  userId: string
  todoId: string
  createdAt: string
}

export const fetchTodoList = async (
  accessToken: string,
  lastEvaluatedKey: TodoLastEvaluatedKey | undefined = undefined,
) => {
  // Pagination用のlastEvaluatedKeyのuserIdは、accessTokenから取得できるので付与しない
  const url =
    `${baseUrl}/todos` +
    (lastEvaluatedKey != null ? `?todo_id=${lastEvaluatedKey.todoId}&created_at=${lastEvaluatedKey.createdAt}` : '')

  const bearerToken = `Bearer ${accessToken}`
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: bearerToken,
    },
  })
  const body = await res.json()
  console.log(res.status, body)
  if (res.status >= 200 && res.status < 300) {
    return body as QueryResponseType<TodoType, TodoLastEvaluatedKey>
  } else {
    throw Error(body.message as unknown as string)
  }
}

export const fetchTodo = async (accessToken: string, todoId: string) => {
  const url = `${baseUrl}/todos/${todoId}`
  const bearerToken = `Bearer ${accessToken}`
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: bearerToken,
    },
  })
  const body = await res.json()
  console.log(res.status, body)
  if (res.status >= 200 && res.status < 300) {
    return body
  } else {
    throw Error(body.message as unknown as string)
  }
}

export const postTodo = async (accessToken: string, todoId: string, todoText: string) => {
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
  const body = await res.json()
  console.log(res.status, body)
  if (res.status >= 200 && res.status < 300) {
    return res.status
  } else {
    throw Error(body.message as unknown as string)
  }
}

export const deleteTodo = async (accessToken: string, todoId: string) => {
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
  const body = await res.json()
  console.log(res.status, body)
  if (res.status >= 200 && res.status < 300) {
    return res.status
  } else {
    throw Error(body.message as unknown as string)
  }
}
