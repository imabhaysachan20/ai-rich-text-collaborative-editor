
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useOthers } from "@liveblocks/react";
import {  useSelf } from "@liveblocks/react/suspense";
import React from "react";

const UserAvatar = () => {
  const self = useSelf();
  const others = useOthers();
  const all = [self,...others];


  
  
  return (
    <div  className="flex -space-x-1" >
      {all.map((user,i)=>{
        return <div key={user.info.email+i}>
          <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>  <Avatar>
  <AvatarImage src={user.info.avatar} />
  <AvatarFallback>{user.info.name?.charAt(0)}</AvatarFallback>
</Avatar></TooltipTrigger>
    <TooltipContent>
      <p>{user.info.email}</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

        
          </div>
      })}
    </div>
  );
};

export default UserAvatar;
