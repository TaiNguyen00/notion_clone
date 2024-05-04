"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader
} from "@/components/ui/dialog"

import { ModeToggle } from "@/components/mode-toggle" 
import { Label } from "@/components/ui/label"
import { useSettings } from "@/hooks/use-setting"
import { UserButton } from "@clerk/clerk-react"


const SettingModal = () => {
  const settings = useSettings()

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className='text-lg pb-3 border-b'>
          <h2 className='text-lg font-medium'>My settings</h2>
        </DialogHeader>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-y-1'>
            <Label>
              Appearance
            </Label>
            <span className='text-[0.8rem] text-muted-foreground'>
              Customize how Notions looks on your device
            </span>
          </div>
          <ModeToggle />
        </div>  
      </DialogContent>
    </Dialog>
  )
}

export default SettingModal