import Link from "next/link";

export default function Menu() {
  return (
    <div className="m-6 flex flex-col rounded-md border border-teal-800 bg-gray-600">
      <Link
        href="/"
        className="m-2 flex justify-center rounded bg-teal-600 px-4 py-2 text-white shadow"
      >
        Main
      </Link>
      <Link
        href="/roulette"
        className="m-2 flex justify-center rounded bg-teal-600 px-4 py-2 text-white shadow"
      >
        Roulette
      </Link>
    </div>
  );
}
