import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { FormEvent, MouseEventHandler, useState, useTransition } from "react";
import { useRoom } from "@liveblocks/react";
import { deleteDocument, deleteUser, inviteUser } from "@/actions/action";
import { useRouter } from "next/navigation";
import {useToast } from "@/hooks/use-toast";

import {toast} from "react-toastify"
import { Input } from "./ui/input";
import useOwner from "@/lib/useOwner";
import { useUser } from "@clerk/nextjs";

import { collectionGroup, query, where } from "firebase/firestore";
import db from "@/firebase";
import { useCollection } from "react-firebase-hooks/firestore";

const ManageUsers = () => {
const {user} = useUser();
  const roomid = useRoom();
  const owner = useOwner();

  const router = useRouter()
  const [userInRoom] = useCollection (
    user &&
    query(collectionGroup(db,"rooms"),where("roomId",'==',roomid.id)))

    
    
  const [isPending,startTransition] = useTransition();

  const [isOpen,setIsOpen] = useState(false);

const handleDelete = async (email:string,sid:string)=>{
  

  
  startTransition(async()=>{
  const {success} = await deleteUser(email,sid);

    if (success) {
      setIsOpen(false)
      router.refresh();
      toast.success("User Removed From Room")
    }
      else {
        toast.error("Something went wrong.")
      }
    
  })
}


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
  <Button variant={'secondary'} asChild>
    <DialogTrigger>Users {`(${userInRoom?.docs.length})`}</DialogTrigger>
  </Button>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Users in room</DialogTitle>
      <DialogDescription>
      <p>Current Users Invited To This Document Room</p>
        <div className="flex flex-col space-y-2 mt-2">

         {userInRoom ? userInRoom.docs.map((doc,i)=>{
          return <div className="border rounded-md p-2 flex justify-between items-center" key = {doc.data().userId + i}>
            <p>{doc.data().userId == user?.emailAddresses[0].toString() ? "(YOU) "+doc.data().userId : doc.data().userId}</p>
            <div className="flex items-center gap-x-2">
            <Button variant={'outline'}>{doc.data().role}</Button>
            {owner && 
            doc.data().userId !== user?.emailAddresses[0].toString() && (
              
              <Button disabled={isPending} onClick={(e)=>{e.preventDefault();handleDelete(doc.data().userId,roomid.id)}} variant={'destructive'}>{isPending?"Removing...":"Remove"}</Button>
            )}
            
            </div>
            </div>
         }): ""}
          </div>
      </DialogDescription>
    </DialogHeader>
 
  </DialogContent>
</Dialog>

  );
};

export default ManageUsers;
