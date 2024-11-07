"use client";

import { useState } from "react";
import { useRouletteStore } from "@/store/roulette";
import clsx from "clsx";
import Item from "./Items";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function ItemsController() {
  const { items, addItem, removeItem, reset, result, setResult } =
    useRouletteStore();

  const [name, setName] = useState("");
  const [weight, setWeight] = useState<number | null>(null);

  const handelAddItem = (addName: string, addWeight: number) => {
    if (addName === "" || addWeight <= 0) {
      return;
    }
    addItem(addName, addWeight);
    setName("");
    setWeight(0);
  };

  const handleRemoveItem = (removeName: string) => {
    removeItem(removeName);
  };

  const pickWithWeight = () => {
    const totalWeight = items.reduce((acc, item) => acc + item.weight, 0);
    const random = Math.random() * totalWeight;

    let cumulativeWeight = 0;
    const selectedItem = items.find((item) => {
      cumulativeWeight += item.weight;
      return random < cumulativeWeight;
    });

    setResult(selectedItem || null);
  };

  const handleReset = () => {
    reset();
    setResult(null);
  };

  return (
    <div className="flex flex-col gap-3 border border-solid border-white p-6 shadow">
      <div className="flex flex-row">
        <h1 className="text-2xl font-bold text-white">ItemsController</h1>
        <Button type="button" className="ml-auto" onClick={handleReset}>
          Reset
        </Button>
      </div>
      {items.map((item) => (
        <Item
          key={item.name}
          name={item.name}
          weight={item.weight}
          onRemoveClick={() => handleRemoveItem(item.name)}
        />
      ))}
      <div className="flex gap-1">
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          placeholder="Name"
        />
        <Input
          type="number"
          id="weight"
          value={weight ?? ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWeight(parseInt(e.target.value, 10))
          }
          placeholder="Weight"
        />
        <Button type="button" onClick={() => handelAddItem(name, weight ?? 0)}>
          Add Item
        </Button>
      </div>
      <Button type="button" onClick={pickWithWeight}>
        Pick
      </Button>
      {result && (
        <div className="flex gap-2">
          <h1
            className={clsx(
              "w-[80px] rounded border border-white bg-gray-600",
              "p-2 text-center text-white",
            )}
          >
            결과
          </h1>
          <p
            className={clsx(
              "grow rounded border border-white bg-gray-600",
              "p-2 text-center text-white",
            )}
          >
            {result.name}
          </p>
        </div>
      )}
    </div>
  );
}
