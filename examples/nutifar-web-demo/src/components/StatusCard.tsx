import PlaygroundCard from "./PlaygroundCard";

interface Status {
  label: string;
  value: string;
  healthy: boolean;
}

interface Props {
  items: Status[];
}

export default function StatusCard({ items }: Props) {
  return (
    <PlaygroundCard title="SDK Status">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between items-center">
            <span>{item.label}</span>

            <span
              className={`text-sm ${
                item.healthy ? "text-green-400" : "text-red-400"
              }`}
            >
              ● {item.value}
            </span>
          </div>
        ))}
      </div>
    </PlaygroundCard>
  );
}
