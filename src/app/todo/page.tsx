'use client'

import * as todo_repository from '../(repositories)/todo_repository'
import { TodoType, TodoLastEvaluatedKey } from '../(repositories)/todo_repository'
import * as local_storage_repository from '../(repositories)/local_storage_repository'

import { useEffect, useState } from 'react'
import * as uuid from 'uuid'

const Page = () => {
  const [todoText, setTodoText] = useState<string>('')
  const [todoTypeList, setTodoTypeList] = useState<TodoType[]>([])
  const [todoLastEvaluatedKey, setTodoLastEvaluatedKey] = useState<TodoLastEvaluatedKey | undefined>()
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    onFetch()
  }, [])

  // 追加
  const onPost = async () => {
    try {
      const accessToken = local_storage_repository.getValue('accessToken')
      if (!accessToken) {
        throw Error('accessToken is empty')
      }
      const todoId = uuid.v4()
      const result = await todo_repository.postTodo(accessToken, todoId, todoText)
      console.log(result)
      // 新しいデータ取得してリストに追加
      if (result === 200) {
        const result = await todo_repository.fetchTodo(accessToken, todoId)
        if (result.Item) {
          setCount(count + 1)
          setTodoTypeList([result.Item, ...todoTypeList])
          setTodoText('')
        }
      }
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Error')
    }
  }

  // 削除
  const onDelete = async (todoId: string) => {
    try {
      const accessToken = local_storage_repository.getValue('accessToken')
      if (!accessToken) {
        throw Error('accessToken is empty')
      }
      const result = await todo_repository.deleteTodo(accessToken, todoId)
      if (result === 200) {
        setCount(Math.max(count - 1, 0))
        setTodoTypeList(todoTypeList.filter((e) => e.todoId != todoId))
      }
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Error')
    }
  }

  // リストを取得
  const onFetch = async () => {
    try {
      const accessToken = local_storage_repository.getValue('accessToken')
      if (!accessToken) {
        throw Error('accessToken is empty')
      }
      const result = await todo_repository.fetchTodoList(accessToken)
      setCount(result.Count)
      setTodoTypeList(result.Items)
      setTodoLastEvaluatedKey(result.LastEvaluatedKey)
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Error')
    }
  }

  // Paginationでリストを取得
  const onFetchMore = async () => {
    try {
      const accessToken = local_storage_repository.getValue('accessToken')
      if (!accessToken) {
        throw Error('accessToken is empty')
      }
      if (!todoLastEvaluatedKey) {
        throw Error('todoLastEvaluatedKey is empty')
      }
      const result = await todo_repository.fetchTodoList(accessToken, todoLastEvaluatedKey)
      setCount(count + result.Count)
      setTodoTypeList([...todoTypeList, ...result.Items])
      setTodoLastEvaluatedKey(result.LastEvaluatedKey)
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Error')
    }
  }

  return (
    <div className="m-4">
      <p>TODO count: {count}</p>
      {/* 入力フォーム */}
      <div>
        <input
          className="block border border-grey-light w-1/3 p-3 rounded mt-2 mb-4 text-black bg-white"
          id="todoId"
          value={todoText}
          onChange={(e) => {
            setTodoText(e.target.value)
          }}
          type="text"
          placeholder="todo"
        />
        <div className="flex">
          <button className="rounded-full py-2 px-4 text-white bg-blue-500 hover:bg-blue-700" onClick={onPost}>
            Save
          </button>
          <button className="rounded-full ml-4 py-2 px-4 text-white bg-blue-500 hover:bg-blue-700" onClick={onFetch}>
            Fetch List
          </button>
        </div>
      </div>
      {/* TODOリスト */}
      <div className="mt-4">
        {todoTypeList.map((e) => {
          return (
            <div className="my-4" key={e.todoId}>
              <div className="flex items-center mb-4">
                <button
                  className="rounded-md mr-2 py-2 px-2 text-white bg-red-500 hover:bg-red-700"
                  onClick={() => {
                    onDelete(e.todoId)
                  }}
                >
                  Delete
                </button>
                <label className="ml-2 text-gray-900 dark:text-gray-300">
                  {e.todoText}, {e.createdAt}
                </label>
              </div>
              <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
            </div>
          )
        })}
      </div>
      {/* Pagination */}
      <button className="rounded-full ml-4 py-2 px-4 text-white bg-blue-500 hover:bg-blue-700" onClick={onFetchMore}>
        Fetch More
      </button>
    </div>
  )
}

export default Page
