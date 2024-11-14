"use client";

import { useRouletteStore } from "@/store/roulette";
import { useState } from "react";
import { Button } from "../ui/button";

export default function ItemPaster() {
  const setItems = useRouletteStore((state) => state.setItems);
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <textarea
        className="h-40 w-80 p-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste items here"
      />
      <Button
        type="button"
        className=""
        onClick={() => {
          const items = text
            .split("\n")
            .filter((item) => item.trim() !== "")
            .map((item) => {
              const parts = item.trim().split(/\s+/);
              const weight = Number(parts.pop());
              const name = parts.join(" ");
              return { name, weight };
            })
            .filter((item) => item.weight > 0);
          setItems(items);
        }}
      >
        set
      </Button>
    </div>
  );
}
