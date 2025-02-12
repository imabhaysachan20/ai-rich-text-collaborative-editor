
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import { ArrowLeftCircle } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex space-x-2 items-center animate-pulse">
      <ArrowLeftCircle className='w-12 h-12'/>
      <h1 className="font-bold">Get Started with creating a New Document</h1>
    </main>
  );
}
