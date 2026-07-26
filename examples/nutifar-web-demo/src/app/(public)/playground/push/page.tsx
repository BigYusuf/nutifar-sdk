"use client";

import DeviceCard from "@/components/DeviceCard";
import EventLog from "@/components/EventLog";
import JsonViewer from "@/components/JsonViewer";
import NotificationFeed from "@/components/NotificationFeed";
import RegisterDeviceCard from "@/components/RegisterDeviceCard";
import SectionHeader from "@/components/SectionHeader";
import SendPushCard from "@/components/SendPushCard";
import StatBadge from "@/components/StatBadge";
import StatusCard from "@/components/StatusCard";
import { usePushPlayground } from "@/hooks/usePushPlayground";

export default function PushPlaygroundPage() {
  const {
    initialized,
    permission,
    loadingPermission,
    loadingRegister,
    loadingSend,
    device,
    notifications,
    events,
    response,
    requestPermission,
    registerDevice,
    sendPush,
  } = usePushPlayground();

  const typedResponse = response as any;
  // const typedEvents = events as any as Event[];
  
  return (
    <main className="container max-w-7xl py-12">
      <SectionHeader
        title="Push Playground"
        description="Test the complete @nutifar/web push notification lifecycle: permission, device registration, sending and receiving notifications."
      />
      {/* Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <StatBadge label="SDK" value={initialized ? "Ready" : "Loading"} />

        <StatBadge label="Permission" value={permission} />

        <StatBadge
          label="Device"
          value={device?.registered ? "Registered" : "Not Registered"}
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <RegisterDeviceCard
            permission={permission}
            device={device}
            loadingPermission={loadingPermission}
            loadingRegister={loadingRegister}
            onRequestPermission={requestPermission}
            onRegister={registerDevice}
          />

          <SendPushCard
            loading={loadingSend}
            disabled={!device?.registered}
            onSend={sendPush}
          />

          <NotificationFeed notifications={notifications} />
        </div>

        <aside className="space-y-6">
          <StatusCard
            items={[
              {
                label: "SDK",
                value: initialized ? "Initialized" : "Starting",
                healthy: initialized,
              },
              {
                label: "Permission",
                value: permission,
                healthy: permission === "granted",
              },

              {
                label: "Device",
                value: device?.registered ? "Registered" : "Missing",
                healthy: !!device?.registered,
              },

              {
                label: "Listener",
                value: "Active",
                healthy: true,
              },
            ]}
          />

          <DeviceCard device={device} />

          <EventLog events={events} />
        </aside>
      </div>
      {typedResponse && (
        <div className="mt-6">
          <JsonViewer data={typedResponse} />
        </div>
      )}
    </main>
  );
}
