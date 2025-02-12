import LiveBlockProvider from '@/components/LiveBlockProvider'
import React from 'react'

function Layout({children}:{children:React.ReactNode}) {
  return (
    <div>
      <LiveBlockProvider>
      {children}
      </LiveBlockProvider>
    </div>
  )
}

export default Layout
