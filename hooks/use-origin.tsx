import { useEffect, useState } from "react";

export const useOrigin = () => {
  const [mouted, setMouted] = useState(false)

  const origin = typeof Window !== "undefined" && window.location.origin ? window.location.origin : "";

  useEffect(() => {
    setMouted(true)
  },[])

  if (!mouted) return '';

  return origin
}