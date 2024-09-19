"use client";
import { useEffect, useState } from "react";
import DeleteIcon from "@/public/svg/delete.svg";
import Image from "next/image";

export default function RandomPicker() {
  const [list, setList] = useState<string[]>([]);
  const [item, setItem] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [lastResult, setLastResult] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    function handleStorageChange() {
      setLastResult(localStorage.getItem("lastResult") || "");
      setList(JSON.parse(localStorage.getItem("lastList") || "[]"));
    }
    handleStorageChange();

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [lastResult]);

  const handleAdd = (item: string) => {
    if (item === "") {
      return;
    }
    if (list.includes(item)) {
      return;
    }
    localStorage.setItem("lastList", JSON.stringify([...list, item]));
    setList([...list, item]);
    setItem("");
  };

  const handleDelete = (item: string) => {
    localStorage.setItem(
      "lastList",
      JSON.stringify(list.filter((i) => i !== item))
    );
    setList(list.filter((i) => i !== item));
  };

  const pickRandom = () => {
    if (list.length === 0) {
      return;
    }
    const lastResult = localStorage.getItem("lastResult");
    const filteredList = list.filter((i) => i !== lastResult);
    const picked =
      filteredList[Math.floor(Math.random() * filteredList.length)];
    if (picked) {
      setResult(picked);
      localStorage.setItem("lastResult", picked);
      setLastResult(picked);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-96 m-4">
      <h1 className="text-3xl bg-emerald-400 shadow-lg rounded p-2">
        Random Picker
      </h1>
      <ul className="flex flex-col gap-4 p-4 items-center">
        {list.map((item) => {
          return (
            <li
              key={item}
              className="flex flex-row items-center align-middle bg-emerald-100 rounded-xl"
            >
              <p className="flex align-center border-black  shadow-sm text-black p-2 font-bold">
                {item}
              </p>
              <button
                onClick={() => handleDelete(item)}
                className="text-xl bg-red-200 shadow-lg text-black w-10 h-10 rounded-full p-2 flex items-center justify-center"
              >
                <Image src={DeleteIcon} alt="delete" width={20} height={20} />
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
        className="w-1/2 text-center text-black border-black bg-emerald-100 p-2 rounded shadow-lg"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Return") {
            handleAdd(item);
          }
        }}
      ></input>
      <button
        type="submit"
        onClick={() => handleAdd(item)}
        className="text-xl bg-emerald-200 rounded shadow-lg text-black w-72 h-12"
      >
        추가하기
      </button>
      <h3 className="text-xl min-w-[50%] min-h-16 border-[1.5px] border-emerald-700 bg-gray-200 shadow-lg rounded p-2 m-4 flex items-center justify-center">
        {result}
      </h3>
      <button
        onClick={() => pickRandom()}
        className="text-xl bg-emerald-200 rounded shadow-lg text-black w-72 h-12"
      >
        뽑기
      </button>
      {lastResult && (
        <p className="p-2 bg-emerald-400 rounded">
          {lastResult}는 제외하고 뽑습니다
        </p>
      )}
    </div>
  );
}
