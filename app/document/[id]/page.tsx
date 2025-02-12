
import Document from '@/components/Document'
import React from 'react'

function page({params:{id}}:{
  params:
  {
    id:string
  }
  
}) {
  
  return (

    <div className='flex flex-col min-h-screen flex-1 py-2.5 px-2'>
      <Document id = {id}/>
    </div>
  )
}

export default page
