"use client"
import React, { useTransition } from 'react'
import { useRouter } from 'next/navigation';
import { Button } from './ui/button'
import { createNewDocument } from '@/actions/action';


function NewDocumentButton() {
  const Router = useRouter();
  const [isPending, startTransition] = useTransition();
  function handleCreateNewDocument() {
    startTransition(async () => {
      const {docID} = await createNewDocument();
      Router.push(`/document/${docID}`);
    }
    )
  }
  return (
    <div className=''>
      <Button onClick={handleCreateNewDocument} disabled={isPending}>{isPending? "Creating" :"New Document"}</Button>
    </div>
  )
}

export default NewDocumentButton
