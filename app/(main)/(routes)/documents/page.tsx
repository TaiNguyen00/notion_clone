"use client"

import Image from "next/image"
// get userInfo
import { useUser } from "@clerk/clerk-react"
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

// convext
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api";

// toast
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Page = () => {

  const router = useRouter()

  const {user} = useUser();
  const create = useMutation(api.documents.create)

  const onCreate = () => {
    const promise = create({ title: "Untitled"})
      .then(res => router.push(`/documents/${res}`))
      
    toast.promise(promise, {
      loading: 'Creating a new note...',
      success: 'New note created!',
      error: 'Failed to create a new note'
    })
  }
  return (
    <div className='h-full flex mx-auto flex-col items-center justify-center space-x-4'>
      <Image 
        src="/empty.png"
        height="300"
        width="300"
        alt="Empty"
        className='dark:hidden block'
      />
      <Image 
        src="/empty-dark.png"
        height="300"
        width="300"
        alt="Empty"
        className='dark:block hidden'
      />
      <h2 className='text-lg font-medium'>
        Welcome to {user?.firstName}&apos;s Notion
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className='h-4 w-4 mr-2'/>
        Create a note
      </Button>
    </div>
  )
}

export default Page