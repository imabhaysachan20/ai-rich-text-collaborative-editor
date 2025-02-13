"use client"
import React, { FormEvent, startTransition, useEffect, useState, useTransition } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import db from '@/firebase'

import { doc, updateDoc } from 'firebase/firestore'
import Editor from './Editor'
import useOwner from '@/lib/useOwner'
import DeleteComponent from './DeleteComponent'
import InviteUser from './InviteUser'
import ManageUsers from './ManageUsers'
import UserAvatar from './UserAvatar'

function Document({id}:{id:string}) {
  const isOwner = useOwner();
  
  
    const[docName,setDocName] = useState("");
    const [data,loading,error] = useDocumentData(doc(db,'documents',id));
    useEffect(()=>{
        if (!data) return;
        setDocName(data.title);
    },[data])
    
    const [docNameChangeIsPending, startDocNameChange] = useTransition();
    
    const handleDocNameChange = (e:FormEvent)=>{
        e.preventDefault();
        if (docName.trim()) {
        startTransition(async()=>{
            await updateDoc(doc(db,"documents",id),{title:docName});
        })
    }
    }

  return (
    <div className="flex-1 bg-white p-5">
      <div >
        <form onSubmit={(e)=>handleDocNameChange(e)} className='max-w-6xl w-full mx-auto flex flex-1 flex-row space-x-2'>
        <Input value={docName} onChange={(e)=>{setDocName(e.target.value)}} className='bg-white'/>            
        <Button type='submit' disabled={docNameChangeIsPending}>Update</Button>

        {isOwner && (<>
          <InviteUser/>
        <DeleteComponent/> 
        </>)}
        </form>
      </div>

      <div className='flex max-w-6xl mx-auto justify-between items-center mb-5 mt-4'>
          <ManageUsers/>
          <UserAvatar/>
      </div>

      <hr className='pb-10 max-w-6xl mx-auto'></hr>
      <Editor/>
    </div>
  )
}

export default Document
