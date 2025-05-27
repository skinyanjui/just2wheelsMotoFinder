"use client"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"

const Header = () => {
  const { user, signOut } = useAuth() // Real auth user with signOut function

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          My App
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            {user ? (
              <>
                <li>
                  <button onClick={() => signOut()} className="hover:text-gray-300">
                    Sign Out
                  </button>
                </li>
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login">Login</Link>
                </li>
                <li>
                  <Link href="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
