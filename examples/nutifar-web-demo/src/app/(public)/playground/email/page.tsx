"use client";


import SectionHeader from "@/components/SectionHeader";
import { useEmailPlayground } from "@/hooks/useEmailPlayground";
import StatBadge from "@/components/StatBadge";
import StatusCard from "@/components/StatusCard";
import EventLog from "@/components/EventLog";
import JsonViewer from "@/components/JsonViewer";
import SendEmailCard from "@/components/SendEmailCard";

export default function EmailPlaygroundPage() {
  const {
    initialized,
    loading,
    events,
    response,
    sendEmail,
  } = useEmailPlayground();

  const channelExamples = [
    {
      title: "Email",
      code: `await sdk.notification.sendEmail({
  to: "john@example.com",
  subject: "Hello",
  html: "<h1>Hello World</h1>"
});`,
    },
    {
      title: "Web Push",
      code: `await sdk.notification.sendPush({
  to: "demo-user",
  title: "New update",
  body: "Your notification is ready"
});`,
    },
    {
      title: "In-App",
      code: `await sdk.notification.sendInApp({
  to: "demo-user",
  title: "Product launch",
  body: "A new feature just landed"
});`,
    },
    {
      title: "SMS",
      code: `await sdk.notification.sendSMS({
  to: "+15551234567",
  body: "Your verification code is 123456"
});`,
    },
  ];

  return (
    <main className="container max-w-7xl py-10">
      <SectionHeader
        title="Email Playground"
        description="Test the @nutifar/web email SDK by sending emails and inspecting SDK responses."
      />

      {/* Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <StatBadge
          label="SDK"
          value={initialized ? "Ready" : "Loading"}
        />

        <StatBadge
          label="Module"
          value="Email"
        />

        <StatBadge
          label="Environment"
          value="Development"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main */}
        <div className="space-y-6 lg:col-span-2">
          <SendEmailCard
            loading={loading}
            onSend={sendEmail}
          />

          <JsonViewer
            data={
              response ?? {
                message: "No response yet",
              }
            }
          />

          <div className="rounded-xl border border-neutral-800 bg-neutral-900">
            <div className="border-b border-neutral-800 px-5 py-4 font-semibold">
              SDK Examples
            </div>

            <div className="space-y-6 p-6">
              {channelExamples.map((example) => (
                <div key={example.title} className="rounded-lg border border-neutral-800 bg-neutral-950/70 p-4">
                  <div className="mb-3 text-sm font-semibold text-neutral-200">
                    {example.title}
                  </div>
                  <pre className="overflow-auto text-sm text-neutral-300">
{example.code}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <StatusCard
            items={[
              {
                label: "SDK",
                value: initialized ? "Initialized" : "Loading",
                healthy: initialized,
              },
              {
                label: "Email Module",
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

          <EventLog
            events={events}
          />
        </aside>
      </div>
    </main>
  );
}