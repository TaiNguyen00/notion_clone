"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'
// use convex
import { useConvexAuth } from 'convex/react'

import { Spinner } from '@/components/spinner'
import Link from 'next/link'
import { SignInButton } from '@clerk/clerk-react'
const Heading = () => {
  const {isAuthenticated, isLoading} = useConvexAuth()
   console.log("use covex", isAuthenticated)
  return (
    <div className='max-w-3xl space-y-4'>
      <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
        Your Ideas, Documents & Plan, Welcome to <span className='underline'>Notions</span>
      </h1>
      <h3 className='text-base sm:text-xl md:text-2xl'>Connected work where <br />Better, faster</h3>
      {isLoading && (
        <div className='justify-center items-center flex w-full'>
          <Spinner size='lg' />
        </div>
      )} 
      {isAuthenticated && !isLoading  && (
        <Button asChild>
          <Link href='/documents'>
            Enter Notion
            <ArrowRightIcon className='h-4 w-4 ml-2'/>
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading &&
        <>
          <SignInButton>
            <Button>
              Get Free
              <ArrowRightIcon className='h-4 w-4 ml-2'/>
            </Button>
          </SignInButton>
        </>
      } 
    </div>

  )
}

export default Heading