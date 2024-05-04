"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader
} from "@/components/ui/dialog"

import { useCoverImage } from "@/hooks/use-cover-image"
import { SingleImageDropzone } from "@/app/(main)/_components/singleImgDropzone"
import { useEdgeStore } from "@/lib/edgestore"
import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useParams } from "next/navigation"
import { Id } from "@/convex/_generated/dataModel"

const CoverImageModal = () => {
  const params = useParams()

  const update = useMutation(api.documents.update)
  const coverImage = useCoverImage()
  const { edgestore } = useEdgeStore();

  const [file, setFile] = useState<File>()
  const [isSubmitting, setIsSubmitting] = useState(false)


  const onChange =async (file?: File) => {
    if (file) {
      setIsSubmitting(true)
      setFile(file)

      const res =  await edgestore.publicFiles.upload({
        file
      })

      if (coverImage.url) {
        const res = await edgestore.publicFiles.upload({
          file,
          options: {
            replaceTargetUrl: coverImage.url
          }
        })
      }

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url
      })

      onClose()
    }
  }

  const onClose = () => {
    setFile(undefined)
    setIsSubmitting(false)
    coverImage.onClose()
  }
  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className='text-xs text-center font-semibold'>
            Cover Image
          </h2>
        </DialogHeader>
        <SingleImageDropzone 
          className='w-full outline-none'
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  )
}

export default CoverImageModal