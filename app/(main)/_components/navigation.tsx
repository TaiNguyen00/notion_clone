"use client"

import { ChevronLeft, MenuIcon, Plus, PlusCircle, Search, Settings, Trash } from "lucide-react"
import { useParams, usePathname, useRouter } from "next/navigation"
import { ElementRef, useEffect, useRef, useState } from "react"

import { useMediaQuery } from "usehooks-ts"

import { cn } from "@/lib/utils"
import UserItems from "./userItems"

// convex
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import Item from "./item"
import { toast } from "sonner"
import DocumentList from "./documentList"
import { Popover, PopoverContent } from "@/components/ui/popover"
import { PopoverTrigger } from "@radix-ui/react-popover"
import TrashBox from "./trashBox"

// use hook
import { useSearch } from "@/hooks/use-search"
import { useSettings } from "@/hooks/use-setting"
import Navbar from "./navbar"
import { UserButton } from "@clerk/clerk-react"

export const Navigation = () => {
  // navigation
  const router = useRouter()
  const pathname = usePathname();
  const params = useParams();



  const create = useMutation(api.documents.create)


  // is mobile that collapsed 
  const isMobile = useMediaQuery("(max-width: 768px)");
  // 
  const isResizeingRef = useRef(false)
  const sidebarRef = useRef<ElementRef<"aside">>(null); //sử dụng useRef để tham chiếu đếm 1 phần tử của DOM kiểu "div" giá trị khởi tạo là null
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false)  // ket hop voi css
  const [isCollapsed, setIsCollapsed] = useState(isMobile) // khi chuyển sang mobile, trạng thái isCollapsed sẽ kích hoạt = true

  // use hook
  const search = useSearch()
  const settings = useSettings()
  // khac phuc loi navbar tu pc chuyen sang mobile van giu nguyen navbar ma kh chuyen sang collapse
  useEffect(() => {
    if (isMobile) {
      collapse() // gọi hàm collapse thu gọn sidebar thành navbar cho mobile
    } else { // gọi hàm lại khi thay đổi ismobile (trường hợp depenensive thứ 3)
      resetWidth() // nếu k gọi hàm resetWidth khi lên lại làn pc thì nó sẽ giữ nguyên trạng thái (width = 100% when mobile) (có thể là do dùng useRef)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isMobile]) // depenasive sẽ thay đổi useEffect này được chạy khi biến isMobile có thay đổi or đc gọi

  useEffect(() => {
    if (isMobile) {
      collapse
    }
  },[pathname, isMobile])

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault()
    event.stopPropagation()

    isResizeingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove) // add event khi có sự kiện mousemove
    document.addEventListener('mouseup', handleMouseUp) //clear event when stop mouse EVENT
  } 

  // khi đang có tương tác với sự kiện
  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizeingRef.current) return;
    let newWidth = e.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    // sử dụng useRef để tham chiếu tới sidebarRed nên có current ngay khi component này đc sinh ra
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`
      navbarRef.current.style.setProperty("left", `${newWidth}px`)
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`)
    }
  }

  // clear event (khi thả kh kéo nữa)
  const handleMouseUp = (e: MouseEvent) => {
    isResizeingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  } 

  //  reset sidebar or navbar về trạng thái ban đầu = 240px hoặc 100%
  const resetWidth = () => {
    // kiểm tra tồn tại sidebar và navbar
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false)// cục sidebar sẽ  mất
      setIsResetting(true) // set lại reseting thì đặt = 0px
      
      sidebarRef.current.style.width = isMobile ? "100%" : "240px"
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      navbarRef.current.style.setProperty(
        "left",
        isMobile ? "0" : "240px"
      );
      // đảm bảo quá trình rs hoành thành trc khi đặt isReseting về false
      setTimeout(() => {
        setIsResetting(false)
      }, 300);
    }
  }

  // thu gọn sidebar và navbar khi trạng thái là mobile
  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true) // trạng thái collapsed = true
      setIsResetting(true) // trong quá trình Reseting đặt lại = 0

      sidebarRef.current.style.width = '0px' // đặt lại sidebar = 0 (none)
      navbarRef.current.style.setProperty('width', "100%") // set width = 100% cho navbar mobile
      navbarRef.current.style.setProperty("left", "0px") // set vị trí của menu icon mobile
    }
  }

  // handle Create
  const handleCreate = () => {
    const promise = create({
      title: 'Untitled'
    })
      .then((documentId) => {
        router.push(`/documents/${documentId}`)
      })
    
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: 'Failed to create a new note'
    })
  }
  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[9999999]",
          isResetting && 'transition-all ease-in-out duration-3000',
          isMobile && "w-0" // is mobile width = 0
        )}
      >
        <div role='button'
          onClick={collapse}
          className={
            cn(
              "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300",
              "dark:hover:bg-neutral-600 absolute top-3 right-3 opacity-0",
              "group-hover/sidebar:opacity-100 transition",
              isMobile && "opacity-100"
            )}
        >
          <ChevronLeft className="h-6 w-6"/>
        </div>
        <div>
          {/* sử dụng component item để tái sử dụng nhiều */}
          <UserItems />
          <Item 
            label="Search"
            icon={Search}
            isSearch
            onClick={search.onOpen}

          />
          <Item 
            label="setting"
            onClick={settings.onOpen}
            icon={Settings}
          />
          <Item  
            onClick={handleCreate}
            label="New page"
            icon={PlusCircle}
          />
        </div>
        <div className="mt-4">
          {/* parensdocument */}
          <DocumentList />
          <Item onClick={handleCreate}
            icon={Plus}
            label="Add a page"
          />
          <Popover>
            <PopoverTrigger className="mt-4 w-full">
              <Item label="trash" icon={Trash}/>
            </PopoverTrigger>
            <PopoverContent side={isMobile ? "bottom" : "right"} className="p-0 w-72">
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>

        {/* resizing hover sidebar */}
        <div 
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className='opacity-0 group-hover/sidebar:opacity-100
          transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0
          '
        >
        </div>
      </aside>
      <div 
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}>    
            {!!params.documentId ? (<Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth}/>) : (
              <nav className='bg-transparent px-3 py-2 w-full'>
                {isCollapsed && <MenuIcon role='button' onClick={resetWidth} className="h-6 w-6 text-muted-foreground"/>}
              </nav>
            )}
      </div>
    </>
  )
}