const baseUrl = process.env.NEXT_PUBLIC_REST_API_BASE_URL

export const fetchTodo = async (accessToken: string, todoId: string): Promise<{ [key: string]: any }> => {
  const url = `${baseUrl}/todo/${todoId}`
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
  const url = `${baseUrl}/todo/${todoId}`
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
