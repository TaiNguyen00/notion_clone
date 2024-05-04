"use client"

import { useScrollTop } from "@/hooks/use-scroll-top"
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { ModeToggle } from "@/components/mode-toggle";

//  use convex auth
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";


const NavBar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth()
  const scrolled = useScrollTop();

  return (
    <div className={cn(
      "z-50 bg-background dark:bg-[#1F1F1F]  fixed top-0 flex items-center w-full p-4",
      scrolled && 'border-b shadow-sm'
    )}
    >
      <Logo />
      {/* justify-between w-full flex items-center gap-x-2 */}
      <div className="md:justify-end md:ml-auto justify-between w-96 flex items-center gap-x-2">
        {isLoading && (<Spinner size='lg' />)}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton>
              <Button variant='ghost' size="sm">Log in</Button>
            </SignInButton>
            {/* get free */}
            <SignInButton>
              <Button size="sm">Get Notion Free</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant='ghost'>
              <Link href='/documents'>
                Enter Notions
              </Link>
            </Button>
            <UserButton afterSignOutUrl="/"/>
          </>
        )} 
        <ModeToggle />
      </div>
    </div>
  )
}

export default NavBar