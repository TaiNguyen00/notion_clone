"use client"

import { useEffect, useState } from "react"

import SettingModal from "../modal/settingModal"
import CoverImageModal from "../modal/coverImageModal"
import SearchCommand from "../searchCommand"

export const ModalProvider = () => {
  const [isMouted, setIsMouted] = useState(false)

  useEffect(() => {
    setIsMouted(true)
  }, [])

  if (!isMouted) return null;
  return (
    <>
      <SettingModal />
      <CoverImageModal />
    </>
  )
}
