'use client'

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import { useUser } from "@clerk/nextjs"
import BreadCrumbs from "./BreadCrumbs"

function Header() {
  const {user} = useUser()
  return (
    <div className="flex justify-between p-5 items-center">
      {!user && <h1 className="text-2xl">AI RICH TEXT EDITOR</h1>}
      {user && <h1 className="text-2xl"> 
        {user.firstName}{'\'s'} Space</h1>}
        <BreadCrumbs/>
    <div>
        <SignedOut>
          <SignInButton/>
        </SignedOut>

      <SignedIn>
        <UserButton/>
      </SignedIn>
      </div>
    </div>
  )
}

export default Header
