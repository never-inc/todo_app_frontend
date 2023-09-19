'use client'

import Link from 'next/link'
import * as todo_repository from '../(repositories)/todo_repository'
import { useRef, useState } from 'react'
import { useLocalStorage, localStorageKey } from '../(hooks)/use_local_storage'

const Page = () => {
  const { value } = useLocalStorage(localStorageKey.accessToken)

  const onFetch = async (todoId: string) => {
    if (!value) {
      console.error('accessToken is empty')
      return
    }
    const result = await todo_repository.fetchTodo(value, todoId)
    console.log(result)
    alert(JSON.stringify(result))
  }

  const onPost = async (todoText: string) => {
    if (!value) {
      console.error('accessToken is empty')
      return
    }
    const todoId = '' // TODO uuid
    const result = await todo_repository.postTodo(value, todoId, todoText)
    console.log(result)
    alert(JSON.stringify(result))
  }

  return (
    <div className="m-4">
      <p>Hello World!!!</p>
      <button
        onClick={() => {
          onFetch('')
        }}
      >
        test
      </button>
    </div>
  )
}

export default Page
