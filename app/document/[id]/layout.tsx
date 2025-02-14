import RoomProvider from '@/components/RoomProvider'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

async function Layout({children, params}:{
    children:React.ReactNode,
    params:Promise<any>
}) {
    auth.protect();
    const {id} = await params;
  return (

    <RoomProvider roomId={id}>
        {children}
     </RoomProvider>
  )
}

export default Layout
