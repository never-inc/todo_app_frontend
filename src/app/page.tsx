import Link from 'next/link'

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
    </main>
  )
}
