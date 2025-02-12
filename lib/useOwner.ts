'use client'

import db from "@/firebase";
import { useUser } from "@clerk/nextjs"
import { useRoom } from "@liveblocks/react";
import { collectionGroup, query, where } from "firebase/firestore";
import { log } from "node:console";

import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

function useOwner() {

    //fetch user logged in data using clerk and cureent room using liveblock providfer
  const {user} = useUser();
  const room = useRoom();
  const [isOwner,setIsOwner] = useState(false);
  //firebase query to get the users that are currently in room
  
  const [usersInRoom] = useCollection(
    query(collectionGroup(db,'rooms'),where('roomId','==',room.id))    
  )

 
  useEffect(()=>{
    if (usersInRoom?.docs && usersInRoom?.docs.length>0) {
        const owners = usersInRoom.docs.filter((doc)=>
            doc.data().role == 'owner'
        )
        
        if (owners.some((owner)=>owner.data().userId === user?.emailAddresses[0].toString())) {
          setIsOwner(true);
        }
        
    }
  },[user,usersInRoom])

  

  return isOwner;
}

export default useOwner
