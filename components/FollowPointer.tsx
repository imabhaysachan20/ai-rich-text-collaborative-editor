import React from "react";
import {motion,useMotionValue,AnimatePresence} from "framer-motion"
import stringToColor from "@/lib/stringToColor";
const FollowPointer = ({x,y,info}:{
  x:number,
  y:number,
  info:{
    name:string;
    email:string;
    avatar:string;
  }
}) => {
  const color =  stringToColor(info.email || '1');
  if (!x || !y) {
    return null;
  }
  return (
    <motion.div style={{top:y,left:x,pointerEvents:"none"}} className="h-4 w-4 rounded-full absolute z-50" initial={{scale:1,opacity:1}} animate={{scale:1,opacity:1}} exit={{scale:0,opacity:0}}>
        <svg width="20" height="30" viewBox="0 0 20 30" xmlns="http://www.w3.org/2000/svg">
  <polygon points="2,2 18,15 10,15 15,28 8,25 5,30" 
    fill={color}
    stroke={color}
    stroke-width="2"/>
</svg>

    <motion.div className="px-2 py-2 bg-neutral-200 text-black font-bold whitespace-nowrap w-max">
      {info?.name || info?.email}
    </motion.div>
    </motion.div>
  );
};

export default FollowPointer;
