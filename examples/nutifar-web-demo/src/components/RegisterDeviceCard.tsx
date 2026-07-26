import PlaygroundCard from "./PlaygroundCard";
import { PushDevice, PermissionState } from "../types";

interface Props {
  permission: PermissionState;
  device?: PushDevice;

  loadingPermission: boolean;
  loadingRegister: boolean;

  onRequestPermission(): void;
  onRegister(): void;
}

export default function RegisterDeviceCard({
  permission,
  device,
  loadingPermission,
  loadingRegister,
  onRequestPermission,
  onRegister,
}: Props) {
  return (
    <PlaygroundCard
      title="Device Registration"
      subtitle="Register this browser for push notifications."
    >
      <div className="space-y-5">
        {/* <div>
          <p className="text-sm text-neutral-500">Permission</p>

          <p className="font-medium capitalize">{permission}</p>
        </div> */}

        <div>
          <p className="text-sm text-neutral-500">Device Token</p>

          <p className="font-mono text-xs break-all">{device?.token ?? "-"}</p>
        </div>

        <div>
          <p className="text-sm text-neutral-500">Device ID</p>

          <p>{device?.id ?? "-"}</p>
        </div>

        <div className="flex gap-3">
          {/* <button
            onClick={onRequestPermission}
            disabled={loadingPermission}
            className="rounded-lg border border-neutral-700 px-4 py-2 hover:bg-neutral-800"
          >
            Request Permission
          </button> */}

          <button
            onClick={onRegister}
            disabled={loadingRegister}
            // disabled={permission !== "granted" || loadingRegister}
            className="rounded-lg bg-white px-4 py-2 text-black disabled:opacity-50"
          >
            Register Device
          </button>
        </div>
      </div>
    </PlaygroundCard>
  );
}
