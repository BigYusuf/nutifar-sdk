"use client";

import EventLog from "@/components/EventLog";
import JsonViewer from "@/components/JsonViewer";
import SectionHeader from "@/components/SectionHeader";
import StatBadge from "@/components/StatBadge";
import StatusCard from "@/components/StatusCard";
import { useEmailPlayground } from "@/hooks/useEmailPlayground";

export default function SmsPlaygroundPage() {
  const { initialized, loading, events, response, sendSMS } = useEmailPlayground();

  return (
    <main className="container max-w-7xl py-10">
      <SectionHeader
        title="SMS Playground"
        description="Send a sample SMS notification with the Nutifar web SDK."
      />

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <StatBadge label="SDK" value={initialized ? "Ready" : "Loading"} />
        <StatBadge label="Module" value="SMS" />
        <StatBadge label="Environment" value="Development" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900">
            <div className="border-b border-neutral-800 px-5 py-4 font-semibold">
              Send a sample SMS notification
            </div>

            <div className="space-y-4 p-6">
              <button
                type="button"
                onClick={() =>
                  sendSMS(
                    "+15551234567",
                    "Your verification code is 123456.",
                  )
                }
                disabled={loading}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send example SMS"}
              </button>

              <pre className="overflow-auto rounded-lg border border-neutral-800 bg-neutral-950/70 p-4 text-sm text-neutral-300">
{`await sdk.notification.sendSMS({
  to: "+15551234567",
  body: "Your verification code is 123456"
});`}
              </pre>
            </div>
          </div>

          <JsonViewer data={response ?? { message: "No response yet" }} />
        </div>

        <aside className="space-y-6">
          <StatusCard
            items={[
              {
                label: "SDK",
                value: initialized ? "Initialized" : "Loading",
                healthy: initialized,
              },
              {
                label: "SMS Module",
                value: "Ready",
                healthy: true,
              },
              {
                label: "Environment",
                value: "Development",
                healthy: true,
              },
            ]}
          />

          <EventLog events={events} />
        </aside>
      </div>
    </main>
  );
}
