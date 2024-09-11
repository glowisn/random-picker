"use client";
import { useState } from "react";

export default function Home() {
  const [list, setList] = useState<string[]>([]);
  const [item, setItem] = useState<string>("");
  const [result, setResult] = useState<string>("결과");

  const handleAdd = (item: string) => {
    if (list.includes(item)) {
      return;
    }
    setList([...list, item]);
    setItem("");
  };

  const handleDelete = (item: string) => {
    setList(list.filter((i) => i !== item));
  };

  const pickRandom = () => {
    if (list.length === 0) {
      return;
    }
    setResult(list[Math.floor(Math.random() * list.length)]);
  };

  return (
    <div className="flex flex-col items-center gap-12">
      <h1 className="text-3xl bg-emerald-200 shadow-lg rounded p-2 m-4 mt-16">
        Random Picker
      </h1>
      <ul className="flex flex-col gap-4 p-4 items-center">
        {list.map((item) => {
          return (
            <li key={item} className="flex flex-row items-center align-middle">
              <p className="flex align-center border-black bg-emerald-100 shadow-sm text-black p-2">
                {item}
              </p>
              <button
                onClick={() => handleDelete(item)}
                className="text-xl bg-emerald-200 shadow-lg text-black w-10 h-10 rounded-full p-2"
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="여기에 메뉴를 입력하세요"
        className="w-1/2 text-center text-black border-black bg-emerald-100"
      ></input>
      <button
        onClick={() => handleAdd(item)}
        className="text-xl bg-emerald-200 rounded shadow-lg text-black w-72 h-12"
      >
        추가하기
      </button>
      <h3 className="text-xl bg-emerald-200 shadow-lg rounded p-2 m-4 mt-16">
        {result}
      </h3>
      <button
        onClick={() => pickRandom()}
        className="text-xl bg-emerald-200 rounded shadow-lg text-black w-72 h-12"
      >
        뽑기
      </button>
    </div>
  );
}
