interface ItemProps {
  name: string;
  weight: number;
  onRemoveClick: (name: string) => void;
}

export default function Item({ name, weight, onRemoveClick }: ItemProps) {
  return (
    <div className="flex gap-3 border border-solid px-6 py-2 shadow">
      <h1 className="rounded-md border border-white px-3 py-1 text-white">
        {name}
      </h1>
      <p className="rounded-md border border-white px-3 py-1 text-white">
        {weight}
      </p>
      <button
        type="button"
        className="text-red-500"
        onClick={() => onRemoveClick(name)}
      >
        X
      </button>
    </div>
  );
}
