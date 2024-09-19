import Menu from "./menu";
import RandomPicker from "./randomPicker";

export default function Home() {
  return (
    <div className="flex h-full min-h-screen flex-col bg-gray-700">
      <Menu />
      <RandomPicker />
    </div>
  );
}
