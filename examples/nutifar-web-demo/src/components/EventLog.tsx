import PlaygroundCard from "./PlaygroundCard";

interface Event {
  id: string;
  message: string;
  timestamp: string;
  level: "info" | "success" | "warning" | "error";
}

interface Props {
  events: Event[];
}

export default function EventLog({ events }: Props) {
  return (
    <PlaygroundCard title="SDK Events">
      <div className="space-y-3 max-h-96 overflow-auto">
        {events.map((event) => (
          <div key={event.id} className="border-b border-neutral-800 pb-3">
            <div className="text-xs text-neutral-500">{event?.timestamp}</div>

            <div>{event.message}</div>
          </div>
        ))}
      </div>
    </PlaygroundCard>
  );
}
