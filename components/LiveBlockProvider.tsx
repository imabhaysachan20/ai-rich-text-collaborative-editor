"use client"
import React from 'react'
import { LiveblocksProvider as LBP } from "@liveblocks/react/suspense";

function LiveBlockProvider({children}:{
    children:React.ReactNode
}) {
    if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
        throw new Error("KEY NOT PRESENT")
    }
  return (
    
    <LBP throttle={16} authEndpoint={'/auth-endpoint'}>
    {children}
    </LBP>
  )
}

export default LiveBlockProvider
