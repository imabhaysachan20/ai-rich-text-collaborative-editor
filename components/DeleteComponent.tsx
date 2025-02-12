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
import { MouseEventHandler, useState, useTransition } from "react";
import { useRoom } from "@liveblocks/react";
import { deleteDocument } from "@/actions/action";
import { useRouter } from "next/navigation";
import {useToast } from "@/hooks/use-toast";

import {toast} from "react-toastify"

const DeleteComponent = () => {
  
  const router = useRouter()
  const {id:roomId} = useRoom()
  const [isPending,startTransition] = useTransition();

  const [isOpen,setIsOpen] = useState(false);
const handleDelete:MouseEventHandler = (e)=>{
  

  e.preventDefault();
  startTransition(async()=>{
    const {success} = await deleteDocument(roomId);

    if (success) {
      setIsOpen(false)
      toast.success("deleted")
      router.replace('/')
    }
      else {
        toast.error("Something went wrong.")
      }
    
  })
}
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
  <Button variant={'destructive'} asChild>
    <DialogTrigger> Delete</DialogTrigger>
  </Button>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your file
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose>
      <Button  variant={'secondary'}>
      Close
      </Button>
      </DialogClose>
      <Button onClick={handleDelete} variant={'destructive'} disabled={isPending}>
      {isPending?'Deleting...':'Delete'}
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

  );
};

export default DeleteComponent;
