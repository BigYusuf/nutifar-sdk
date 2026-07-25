import PlaygroundCard from "./PlaygroundCard";

interface Props {
  data: unknown;
}

export default function JsonViewer({ data }: Props) {
  return (
    <PlaygroundCard title="Response">
      <pre className="overflow-auto rounded bg-neutral-950 p-4 text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    </PlaygroundCard>
  );
}
