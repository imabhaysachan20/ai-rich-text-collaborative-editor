"use client"
import { useMyPresence, useOthers } from "@liveblocks/react";
import React, { PointerEventHandler } from "react";
import FollowPointer from "./FollowPointer";

const LiveCursorProvider = ({children}:{children:React.ReactNode}) => {
  const [myPresence,updateMyPresence] = useMyPresence();
  const others = useOthers();

  const handlePointerMove:PointerEventHandler<HTMLDivElement> = (e)=>{
    const cursor = {x:Math.floor(e.pageX),y:Math.floor(e.pageY)};
    updateMyPresence({cursor});

  }

  const handlerClientLeave = ()=>{
    updateMyPresence({cursor:null});
  }
  return (
    <div onPointerMove={handlePointerMove} onPointerLeave={handlerClientLeave}>
      {others
      .filter((other)=>other.presence.cursor!==null)
      .map(({connectionId,presence,info})=> <FollowPointer key={connectionId} info={info} x={presence.cursor!.x} y = {presence.cursor!.y}/>)}
      {children}
    </div>
  );
};

export default LiveCursorProvider;
