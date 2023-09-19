'use client'

import * as todo_repository from '../(repositories)/todo_repository'
import * as local_storage_repository from '../(repositories)/local_storage_repository'
import { useState } from 'react'
import * as uuid from 'uuid'

const Page = () => {
  const [todoText, setTodoText] = useState<string>('')

  const onPost = async () => {
    const accessToken = local_storage_repository.getValue('accessToken')
    if (!accessToken) {
      console.error('accessToken is empty')
      return
    }
    const todoId = uuid.v4()
    const result = await todo_repository.postTodo(accessToken, todoId, todoText)
    console.log(result)
    alert(JSON.stringify(result))
  }

  const onDelete = async (todoId: string) => {
    const accessToken = local_storage_repository.getValue('accessToken')
    if (!accessToken) {
      console.error('accessToken is empty')
      return
    }
    const result = await todo_repository.deleteTodo(accessToken, todoId)
    console.log(result)
    alert(JSON.stringify(result))
  }

  const onFetchAll = async () => {
    const accessToken = local_storage_repository.getValue('accessToken')
    if (!accessToken) {
      console.error('accessToken is empty')
      return
    }
    const result = await todo_repository.fetchTodoList(accessToken)
    console.log(result)
    alert(JSON.stringify(result))
  }

  return (
    <div className="m-4">
      <p>TODOメモ</p>
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
          <button className="rounded-full ml-4 py-2 px-4 text-white bg-blue-500 hover:bg-blue-700" onClick={onFetchAll}>
            Fetch List
          </button>
        </div>
      </div>
      {/* リスト */}
      <div className="mt-4">
        {/* TODO */}
        <div className="my-4">
          <div className="flex items-center mb-4">
            <label className="ml-2 text-gray-900 dark:text-gray-300">TODOTODO</label>
            <button
              className="rounded-md ml-2 py-2 px-2 text-white bg-red-500 hover:bg-red-700"
              onClick={() => {
                // TODO
                // onDelete('')
              }}
            >
              Delete
            </button>
          </div>
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  )
}

export default Page
