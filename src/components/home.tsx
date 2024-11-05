import Menu from "./menu";
import RandomPicker from "./randomPicker";

export default function Home() {
  return (
    <div className="flex h-full min-h-screen flex-row bg-gray-800 p-4">
      <Menu />
      <RandomPicker />
    </div>
  );
}
