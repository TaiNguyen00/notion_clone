"use client"

import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import Item from "./item"
import { cn } from "@/lib/utils"
import { FileIcon } from "lucide-react"

interface DocumentListProps {
  parentDocumentId?: Id<"documents">
  level?: number
  data?: Doc<"documents">[]
}

const DocumentList = ({
  parentDocumentId,
  level = 0
} : DocumentListProps) => {

  const params = useParams()
  const router = useRouter()

  const [expanded, setExpanded] = useState<Record<string, boolean>>({}) // kiểu dữ liueje true, false, kèm theo id

  const onExpanded = (documentId: string) => {
    setExpanded(prevExpanded => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId] //true ==> false
    }))
  }


  // get all documents
  const documents = useQuery(api.documents.getSideBar, {
    parentDocument: parentDocumentId
  })

  // 
  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`)
  }

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level}/>
        {level === 0 && (
          <>
            <Item.Skeleton level={level}/>
            <Item.Skeleton level={level}/>
          </>
        )}
      </>
    )
  }

  return (
    <>
      <p 
      style={{
        paddingLeft: level ? `${(level * 12) + 25}px` : undefined
      }}
      className={cn(
        "hidden text-sm font-medium text-muted-foreground",
        expanded && "last:block"
      )}
      >
        No pages inside
      </p>
      {/* get all documents */}
      {documents?.map((document) => (
        <div key={document._id}>
          <Item 
            id={document._id}
            onClick={() => onRedirect(document._id)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document._id}
            level={level}
            onExpand={() => onExpanded(document._id)}
            expanded={expanded[document._id]}
          />
          {expanded[document._id] && ( // sử dụng đệ quy, nếu đã có doc._id, thì sẽ thêm trường parentdocumentID của document cha
            <DocumentList 
              parentDocumentId={document._id}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </>
  )
}

export default DocumentList