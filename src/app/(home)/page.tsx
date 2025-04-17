"use client";


import { Button } from "@/components/ui/button";;
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("I'm a input");
  const [textArea, setTextArea] = useState("I'm a textarea");
  return (
    <div className="p-4">
      <div className="flex flex-col gap-y-4">
        <div>
          <Button variant="elevated">
            I am a button
          </Button>
        </div>
        <div>
          <Input placeholder={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div>
          <Progress value={50} />
        </div>
        <div>
          <Textarea value={textArea} onChange={(e) => setTextArea(e.target.value)} />
        </div>
        <div>
          <Checkbox />
        </div>
      </div>
    </div>
  );
}
