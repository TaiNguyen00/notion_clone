"use client"

import { api } from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
import { useParams, useRouter } from "next/navigation"
import { Search, Trash, Undo } from "lucide-react"
import { useState } from "react"
import { Id } from "@/convex/_generated/dataModel"
import { toast } from "sonner"
import { Spinner } from "@/components/spinner"
import { Input } from "@/components/ui/input"
// confirm modal
import ConfirmModal from "../../../components/modal/confirmModal"


const TrashBox = () => {
  const router = useRouter()
  const params = useParams()
  const documents = useQuery(api.documents.getTrash)
  const restore = useMutation(api.documents.restore)
  const remove = useMutation(api.documents.remove)

  const [search, setSearch] = useState("")
  const filteredDocument = documents?.filter(doc => {
    return doc.title.toLowerCase().includes(search.toLowerCase())
  })

  const onClick  = (documentId: string) => {
    router.push(`/documents/${documentId}`)
  }

  const onRestore = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, documentId: Id<"documents">) => {
    event.stopPropagation()
    const promise =  restore({id : documentId})

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored",
      error: "Failed to restored note"
    })

  }

  const onRemove = ( documentId: Id<"documents">) => {
    const promise = remove({id: documentId})

    toast.promise(promise, {
      loading: "Removing note...",
      success: "Removed note!",
      error: "Failed to removed note "
    })

    if (params.documentId === documentId) {
      router.push(`/documents`)
    }
  }

  if (documents === undefined) {
    return (
      <div className='h-full flex items-center justify-center p-4'>
        <Spinner size='lg'/>
      </div>
    )
  }
  return (
    <div className="text-sm dark:bg-secondary">
      <div className='flex items-center gap-x-1 p-2'>
        <Search className='h-4 w-4'/>
        <Input 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='h-7 px-2 focus-visible:ring-transparent bg-secondary'
          placeholder="Filter by page title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className='text-xs last:block text-center text-muted-foreground pb-2'>
          No documents found.
        </p>
        {filteredDocument?.map(doc => (
          <div key={doc._id}
            role='button'
            onClick={() => onClick(doc._id)}
           className='text-sm rounded-sm w-full hover:bg-primary/5 flex items-center justify-between'
          >
            <span className='truncate pl-2'>
              {doc.title}
            </span>
            <div className='flex items-center'>
              <div className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                role='button'
                onClick={(e) => onRestore(e, doc._id)}
              >
                <Undo className="h-4 w-4 text-muted-foreground"/>
              </div>
              <ConfirmModal onConfirm={() => onRemove(doc._id)}>
                <div
                  role="button"
                  className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                >
                  <Trash className='h-4 w-4 text-muted-foreground'/>
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrashBox