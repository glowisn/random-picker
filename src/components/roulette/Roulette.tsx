import Menu from "../menu";
import ItemsController from "./ItemsController";

export default function Roulette() {
  return (
    <div className="flex h-full min-h-screen flex-row bg-gray-800 p-4">
      <Menu />
      <ItemsController />
    </div>
  );
}
