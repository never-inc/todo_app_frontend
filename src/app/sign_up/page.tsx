'use client'

import { useRef } from 'react'
import { signUpWithPassword } from '../(repositories)/auth_repository'
import { useRouter } from 'next/navigation'
import { useAuthUser } from '../(providers)/auth_user_provider'

const Page = () => {
  const refEmail = useRef<HTMLInputElement>(null)
  const refPassword = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [_, setAuthUser] = useAuthUser()

  const onSubmit = async () => {
    if (!refEmail.current?.value) {
      console.log('email is Empty')
      return
    }
    if (!refPassword.current?.value) {
      console.log('password is Empty')
      return
    }

    await signUpWithPassword(refEmail.current.value, refEmail.current.value, refPassword.current.value)
    router.push(`/confirm_email_code`)
  }

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>

          <input
            type="text"
            defaultValue=""
            ref={refEmail}
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
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
            Create Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
