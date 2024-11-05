"use client";

import { ItemType } from "@/type/ItemType";
import { useState } from "react";
import Item from "./Items";

export default function ItemsController() {
  const [items, setItems] = useState<ItemType[]>([]);

  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);

  const [result, setResult] = useState<ItemType | null>(null);

  const addItem = (addName: string, addWeight: number) => {
    setItems([...items, { name: addName, weight: addWeight }]);
    setName("");
    setWeight(0);
  };

  const removeItem = (removeName: string) => {
    setItems(items.filter((item) => item.name !== removeName));
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

  const reset = () => {
    setItems([]);
    setResult(null);
  };

  return (
    <div className="m-4 flex flex-col gap-3 border border-solid border-white p-6 shadow">
      <div className="flex flex-row">
        <h1 className="text-2xl font-bold text-white">ItemsController</h1>
        <button
          type="button"
          className="ml-auto rounded border border-white px-2 py-1 text-white"
          onClick={reset}
        >
          Reset
        </button>
      </div>
      {items.map((item) => (
        <Item
          key={item.name}
          name={item.name}
          weight={item.weight}
          onRemoveClick={removeItem}
        />
      ))}
      <div className="flex gap-1">
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(parseInt(e.target.value, 10))}
          placeholder="Weight"
        />
        <button
          className="rounded bg-teal-500 px-4 py-2 font-bold text-white hover:bg-teal-700"
          type="button"
          onClick={() => addItem(name, weight)}
        >
          Add Item
        </button>
      </div>
      <button
        className="rounded bg-teal-500 px-4 py-2 font-bold text-white hover:bg-teal-700"
        type="button"
        onClick={pickWithWeight}
      >
        Pick
      </button>
      {result && (
        <div className="rounded border border-white bg-gray-600">
          <h1 className="text-white">Result</h1>
          <p className="text-white">{result.name}</p>
        </div>
      )}
    </div>
  );
}
