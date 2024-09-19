import Menu from "./menu";
import RandomPicker from "./randomPicker";

export default function Home() {
  return (
    <div className="flex flex-col bg-gray-700 h-full min-h-screen">
      <Menu />
      <RandomPicker />
    </div>
  );
}
