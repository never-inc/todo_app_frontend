'use client'

import { useRef } from 'react'
import * as cognito_repository from '../(repositories)/cognito_repository'
import { useRouter } from 'next/navigation'
import { useAuthUser } from '../(providers)/auth_user_provider'

const Page = () => {
  const refCode = useRef<HTMLInputElement>(null)
  const [authUser] = useAuthUser()
  const username = authUser?.email
  const router = useRouter()

  const onSubmit = async () => {
    if (!refCode.current?.value) {
      console.log('code is Empty')
      return
    }
    if (!username) {
      console.log('username is Empty')
      return
    }

    await cognito_repository.confirmRegistration(username, refCode.current.value)
    router.push('/todo')
  }

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Confirm Email Code</h1>

          <input
            type="text"
            ref={refCode}
            className="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="code"
          />

          <button
            type="submit"
            onClick={onSubmit}
            className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-green-dark focus:outline-none my-1"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
