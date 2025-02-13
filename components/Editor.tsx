"use client"
import { useEffect, useState } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom } from "@liveblocks/react/suspense";
import { BookAIcon, LanguagesIcon, MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useSelf } from "@liveblocks/react/suspense";
import stringToColor from "@/lib/stringToColor";
import Translate from "./Translate";
import Summarise from "./Summarise";

type EditorProps = {
  doc: Y.Doc;
  provider: LiveblocksYjsProvider;
  darkMode: boolean;
};


function BlockNote({ doc, provider, darkMode }: EditorProps) {

  
  const userInfo = useSelf((me)=>me.info)
  

  
  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: userInfo?.name || "Guest",
        color: userInfo?.email? stringToColor(userInfo?.email) : "#777777" ,
      },
    },
  });

  return <BlockNoteView className="min-h-screen max-w-6xl mx-auto" editor={editor} theme={darkMode?"dark":"light"}/>;
}

const Editor = () => {
  const room = useRoom();
  
  
  const [doc, setDoc] = useState<Y.Doc | null>(null);
  const [provider, setProvider] = useState<LiveblocksYjsProvider | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (!room)  return;
    
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);

    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc.destroy();
      yProvider.destroy();
    };
  }, [room]);

  if (!doc || !provider) return null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-2 mb-10 justify-end">
       <Translate/>
       <Summarise/>
        <Button
          className={`hover:text-white ${
            darkMode
              ? "text-gray-300 bg-gray-700 hover:bg-gray-500"
              : "text-gray-700 bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>
      <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
    </div>
  );
};

export default Editor;
