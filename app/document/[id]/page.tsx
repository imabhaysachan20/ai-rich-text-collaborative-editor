
import Document from '@/components/Document'
import React from 'react'

async function page({params}:{
  params:Promise<any>
}) {
  
  const { id } = await params
  return (
    <div className='flex flex-col min-h-screen flex-1 py-2.5 px-2'>
      <Document id = {id}/>
    </div>
  )
}

export default page
