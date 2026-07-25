import PlaygroundCard from "./PlaygroundCard";
import { PushDevice } from "../types";

interface Props {
  device?: PushDevice;
}

export default function DeviceCard({ device }: Props) {
  return (
    <PlaygroundCard title="Current Device">
      <div className="space-y-4">
        <Item label="Platform" value={device?.platform} />

        <Item label="Browser" value={device?.browser} />

        <Item label="Registered" value={device?.registered ? "Yes" : "No"} />

        <Item label="Device ID" value={device?.id} />
      </div>
    </PlaygroundCard>
  );
}

function Item({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-neutral-500">{label}</span>

      <span>{value ?? "-"}</span>
    </div>
  );
}
