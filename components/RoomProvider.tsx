"use client";
import React from 'react'
import {ClientSideSuspense, RoomProvider as RP} from "@liveblocks/react/suspense"
import LoadingSpinner from './LoadingSpinner'
import LiveCursorProvider from './LiveCursorProvider'
function RoomProvider({roomId,children}:{children:React.ReactNode,roomId:string}) {
  return (
    <RP id={roomId} initialPresence={{
        cursor:null
    }} >
        <ClientSideSuspense fallback={<LoadingSpinner/>}>
        <LiveCursorProvider>
        {children}
        </LiveCursorProvider>
        </ClientSideSuspense>
    </RP>
  )
}

export default RoomProvider
