interface ItemProps {
  name: string;
  weight: number;
  onRemoveClick: (name: string) => void;
}

export default function Item({ name, weight, onRemoveClick }: ItemProps) {
  return (
    <div className="m-4 flex gap-3 border border-solid border-white p-6 shadow">
      <h1 className="rounded border border-white px-2 py-1 text-white">
        {name}
      </h1>
      <p className="rounded border border-white px-2 py-1 text-white">
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
