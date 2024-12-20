"use client";

import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import DeleteIcon from "@/public/svg/delete.svg";
import Image from "next/image";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function RandomPicker() {
  const [list, setList] = useState<string[]>([]);
  const [item, setItem] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [lastResult, setLastResult] = useState<string>("");
  const [prevSearches, setPrevSearches] = useState<string[]>([]);
  const [alertDialogOpen, setAlertDialogOpen] = useState<boolean>(false);
  const [alertDialogContent, setAlertDialogContent] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }
    function handleStorageChange() {
      setLastResult(localStorage.getItem("lastResult") || "");
      setList(JSON.parse(localStorage.getItem("lastList") || "[]"));
      setPrevSearches(JSON.parse(localStorage.getItem("prevSearches") || "[]"));
    }
    handleStorageChange();

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [lastResult]);

  const handleAdd = (addItem: string) => {
    if (addItem.length > 32) {
      setAlertDialogOpen(true);
      setAlertDialogContent("메뉴 이름이 너무 깁니다!");
      return;
    }
    if (addItem === "") {
      setAlertDialogOpen(true);
      setAlertDialogContent("메뉴를 입력해주세요!");
      return;
    }
    if (list.includes(addItem)) {
      setAlertDialogOpen(true);
      setAlertDialogContent("이미 있는 메뉴입니다!");
      return;
    }
    localStorage.setItem("lastList", JSON.stringify([...list, addItem]));
    localStorage.setItem(
      "prevSearches",
      JSON.stringify([...prevSearches, addItem]),
    );
    setPrevSearches([...prevSearches, addItem]);
    setList([...list, addItem]);
    setItem("");
  };

  const handlePrevSearchesToList = (searchAddItem: string) => {
    if (list.includes(searchAddItem)) {
      setAlertDialogOpen(true);
      setAlertDialogContent("이미 있는 메뉴입니다!");
      return;
    }
    localStorage.setItem("lastList", JSON.stringify([...list, searchAddItem]));
    setList([...list, searchAddItem]);
  };

  const handleDelete = (deleteItem: string) => {
    localStorage.setItem(
      "lastList",
      JSON.stringify(list.filter((i) => i !== deleteItem)),
    );
    setList(list.filter((i) => i !== deleteItem));
  };

  const handleReset = () => {
    localStorage.setItem("lastList", JSON.stringify([]));
    setList([]);
  };

  const handlePrevSearchesDelete = (searchDeleteItem: string) => {
    localStorage.setItem(
      "prevSearches",
      JSON.stringify(prevSearches.filter((i) => i !== searchDeleteItem)),
    );
    setPrevSearches(prevSearches.filter((i) => i !== searchDeleteItem));
  };

  const resetPrevSearches = () => {
    localStorage.setItem("prevSearches", JSON.stringify([]));
    setPrevSearches([]);
  };

  const pickRandom = () => {
    if (list.length === 0) {
      return;
    }
    const lastResultFromStorage = localStorage.getItem("lastResult");
    const filteredList = list.filter((i) => i !== lastResultFromStorage);
    const picked =
      filteredList[Math.floor(Math.random() * filteredList.length)];
    if (picked) {
      setResult(picked);
      localStorage.setItem("lastResult", picked);
      setLastResult(picked);
    }
  };

  return (
    <AlertDialog open={alertDialogOpen}>
      <div className="mx-auto my-4 flex w-96 flex-col items-center gap-4">
        <h1 className="text-3xl text-white">Random Picker</h1>
        {prevSearches.length > 0 && (
          <>
            <ul className="grid grid-cols-4 rounded-md border-2 p-2">
              {prevSearches.map((presSearchItem) => {
                return (
                  <div
                    key={presSearchItem}
                    className="flex flex-row items-center"
                  >
                    <Button
                      type="button"
                      onClick={() => handlePrevSearchesToList(presSearchItem)}
                      className=""
                    >
                      {presSearchItem}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handlePrevSearchesDelete(presSearchItem)}
                      className="items-center justify-center"
                    >
                      x
                    </Button>
                  </div>
                );
              })}
            </ul>
            <Button
              type="button"
              className="rounded"
              onClick={() => resetPrevSearches()}
            >
              검색 기록 초기화
            </Button>
          </>
        )}
        {list.length > 0 && (
          <>
            <ul className="flex flex-col items-center gap-4 rounded-md p-4">
              {list.map((listItem) => {
                return (
                  <li
                    key={listItem}
                    className="flex flex-row items-center align-middle"
                  >
                    <p className="flex border-black p-2 font-bold text-black shadow-sm">
                      {listItem}
                    </p>
                    <Button
                      type="button"
                      onClick={() => handleDelete(listItem)}
                      className="flex size-10 items-center justify-center"
                    >
                      <Image
                        src={DeleteIcon}
                        alt="delete"
                        width={20}
                        height={20}
                      />
                    </Button>
                  </li>
                );
              })}
            </ul>
            <Button type="button" className="" onClick={() => handleReset()}>
              비우기
            </Button>
          </>
        )}
        <Input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="여기에 추가할 메뉴를 입력하세요"
          className="w-[260px]"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Return") {
              handleAdd(item);
            }
          }}
        />

        <Button
          type="submit"
          onClick={() => handleAdd(item)}
          className="h-12 w-72"
        >
          추가하기
        </Button>
        <h3 className="m-4 flex min-h-16 min-w-[50%] items-center justify-center rounded border-[1.5px] border-emerald-700 bg-gray-200 p-2 text-xl shadow-lg">
          {result}
        </h3>
        <Button
          type="button"
          onClick={() => pickRandom()}
          className="h-12 w-72"
        >
          뽑기
        </Button>
        {lastResult && (
          <p className="p-2 text-white">{lastResult}는 제외하고 뽑습니다</p>
        )}
      </div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription>{alertDialogContent}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setAlertDialogOpen(false)}>
            닫기
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
