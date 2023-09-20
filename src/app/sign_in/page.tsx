'use client'

import { useRef } from 'react'
import { signInWithPassword } from '../(repositories)/auth_repository'
import { useRouter } from 'next/navigation'

const Page = () => {
  const refUsername = useRef<HTMLInputElement>(null)
  const refPassword = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const onSubmit = async () => {
    if (!refUsername.current?.value) {
      console.log('username is Empty')
      return
    }
    if (!refPassword.current?.value) {
      console.log('password is Empty')
      return
    }

    await signInWithPassword(refUsername.current.value, refPassword.current.value)
    router.push('/todo')
  }

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign in</h1>

          <input
            type="text"
            defaultValue=""
            ref={refUsername}
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="username"
            pattern="^[0-9a-zA-Z]+$"
            placeholder="email"
          />

          <input
            type="password"
            defaultValue=""
            ref={refPassword}
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="password"
          />

          <button
            type="submit"
            onClick={onSubmit}
            className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-green-dark focus:outline-none my-1"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
