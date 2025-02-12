"use client"
import React, { useEffect, useState } from 'react'
import NewDocumentButton from './NewDocumentButton'
import {useCollection} from 'react-firebase-hooks/firestore'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { collectionGroup, DocumentData, query, where } from 'firebase/firestore'
import db from '@/firebase'
import SideBarOption from './SideBarOption'
function SideBar() {
  interface RoomDocument extends DocumentData {
    userId: string;
    createdAt: string;
    roomId: string;
    role: "owner" | "editor";
  }
  const [groupedData,setGroupData]= useState<{owner:RoomDocument[];editor:RoomDocument[]}>({owner:[],editor:[]});
  const {user} = useUser();
  const [data,loading,error]  = useCollection(
    user && 
    query(collectionGroup(db,'rooms'), where('userId','==', user.emailAddresses[0].toString()))
  )

  useEffect(()=>{
    if (!data) return;
    
    
    const groupedData = data?.docs.reduce<{owner:RoomDocument[],editor:RoomDocument[]}>((acc,curr)=>{
      const role = curr.data().role;
      
      
      if(role === 'owner'){
        acc.owner.push(
          {id:curr.id,...curr.data() as RoomDocument} 
        )
      }
      else {
        acc.editor.push(
          {id:curr.id,...curr.data() as RoomDocument} 
        )
      }
      return acc;
    },{owner:[],editor:[]})
    setGroupData(groupedData);
  },[data])
  
  const menuOptions = (<>
    <NewDocumentButton/>
    <div className='flex py-4 flex-col space-y-4 md:max-w-36'>
      
      <h1 className='text-sm text-gray-500 font-semibold'>My Documents</h1>
    {groupedData.owner.length==0 ? <h1 className='text-gray font-semibold text-sm my-2'>No Docuement Found</h1> :
    <>
    {groupedData.owner.map((doc)=>{return <SideBarOption key={doc.id} id={doc.id} href={`/document/${doc.id}`}></SideBarOption>})}</> }
    <h1 className='text-sm text-gray-500 font-semibold'>Shared With Me</h1>
    
    {groupedData.editor.length==0 ? <h1 className='text-gray font-semibold text-sm mt-2'>No Docuement Found</h1> :
    groupedData.editor.map((doc)=>{return <SideBarOption key={doc.id} id={doc.id} href={`/document/${doc.id}`}></SideBarOption>})}
    
    </div>
    </>
    )
  return (
    <div className='p-2 md:pd-5 bg-gray-200 relative'>
      <div className='block md:hidden'>
      <Sheet >
  <SheetTrigger><MenuIcon className='p-2 hover:opacity-30 rounded-lg' size={40}/></SheetTrigger>
  <SheetContent side={'left'}>
    <SheetHeader>
      <SheetTitle>Menu</SheetTitle>  
    <div>{menuOptions}</div>
    </SheetHeader>
  </SheetContent>
</Sheet>
</div>
      <div className='hidden md:block'>
      {menuOptions}
      </div>

      
    </div>
  )
}

export default SideBar
