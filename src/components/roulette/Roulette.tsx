import ItemPaster from "./ItemPaster";
import ItemsController from "./ItemsController";

export default function Roulette() {
  return (
    <div className="m-4 flex h-full flex-row gap-2 p-4">
      <ItemsController />
      <ItemPaster />
    </div>
  );
}
