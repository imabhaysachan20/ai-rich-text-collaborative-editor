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
import { deleteDocument, inviteUser } from "@/actions/action";
import { useRouter } from "next/navigation";
import {useToast } from "@/hooks/use-toast";

import {toast} from "react-toastify"
import { Input } from "./ui/input";

const InviteUser = () => {
  
  const [email,setEmail]  = useState("");
  const {id:roomId} = useRoom()
  const [isPending,startTransition] = useTransition();

  const [isOpen,setIsOpen] = useState(false);

const handleInvite = async (e:FormEvent)=>{
  

  e.preventDefault();
  startTransition(async()=>{
  const {success} = await inviteUser(email,roomId);

    if (success) {
      setIsOpen(false)
      toast.success("User Added To Document")
    }
      else {
        toast.error("Something went wrong.")
      }
    
  })
}
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
  <Button variant={'outline'} asChild>
    <DialogTrigger> Invite</DialogTrigger>
  </Button>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Invite A Friend</DialogTitle>
      <DialogDescription>

        <form onSubmit={handleInvite} className="flex flex-row">
        <Input onChange={(e)=>setEmail(e.target.value)} className="w-full" placeholder="email" type="email"></Input>
        <Button type="submit">{isPending?"Inviting...":"Invite"}</Button>
        </form>
      </DialogDescription>
    </DialogHeader>
 
  </DialogContent>
</Dialog>

  );
};

export default InviteUser;
