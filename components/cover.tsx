import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';
import { ImageIcon, X } from 'lucide-react';
import { useCoverImage } from '@/hooks/use-cover-image';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';

import { useEdgeStore } from '@/lib/edgestore';

import { Skeleton } from './ui/skeleton';


interface CoverImgProps {
  url?: string;
  preview?: boolean
}
const Cover = ({url, preview} : CoverImgProps) => {

  const {edgestore} = useEdgeStore()

  const params = useParams()
  const coverImage = useCoverImage()
  const removeCoverImg = useMutation(api.documents.removeImageCover)

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
     removeCoverImg({
      id: params.documentId as Id<"documents">,
    })
  }
  return (
    <div className={cn(
      "relative w-full h-[35vh] group",
      !url && "h-[12vh]",
      url && "bg-muted"
    )}>
      {!!url && (
        <Image 
          src={url}
          fill
          alt='Cover'
          className='object-cover'
        />
      )}

      {/* we have bug Error: Invalid src prop (https://files.edgestore.dev/ywd1j144mu75jknn/publicFiles/_public/99002c0e-b6d7-4ba5-b277-794734652b48.jpg) on `next/image`, hostname "files.edgestore.dev" is not configured under images in your `next.config.js`
    See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host */}
    {!!url && !preview && (
      <div className='opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2'>
        <Button
          onClick={() => coverImage.onReplace(url)}
          className='text-muted-foreground text-xs'
          variant='ghost'
          size='sm'
        >
          <ImageIcon className='h-4 w-4 mr-2'/>
          Change cover
        </Button>
        <Button
          onClick={onRemove}
          className='text-muted-foreground text-xs'
          variant='ghost'
          size='sm'
        >
          <X className='h-4 w-4 mr-2'/>
          Remove cover
        </Button>
      </div>
    )} 
    </div>
  )
}

Cover.Skeleton = function CoverSkeleton() {
  return (
    <Skeleton className='w-full h-[24vh]' />
  )
}

export default Cover