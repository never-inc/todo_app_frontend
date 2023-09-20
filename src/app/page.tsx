'use client'

import Link from 'next/link'
import { signOut } from './(repositories)/auth_repository'

export default function Home() {
  return (
    <main className="p-24">
      <Link href="/sign_up" className="underline">
        <p>SignUp Page</p>
      </Link>
      <Link href="/sign_in" className="underline">
        <p>SignIn Page</p>
      </Link>
      <Link href="/todo" className="underline">
        <p>Todo Page</p>
      </Link>
      <button
        className="rounded-full py-2 px-4 my-4 text-white bg-blue-500 hover:bg-blue-700"
        onClick={async () => {
          signOut()
          alert('サインアウトしました')
        }}
      >
        Sign Out
      </button>
    </main>
  )
}
