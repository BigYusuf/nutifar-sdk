"use client";

import { useState } from "react";
import PlaygroundCard from "./PlaygroundCard";

interface Props {
  loading: boolean;
  disabled?: boolean;

  onSend(title: string, body: string, data: string): void;
}

export default function SendPushCard({ loading, disabled, onSend }: Props) {
  const [title, setTitle] = useState("Hello 👋");

  const [body, setBody] = useState(
    "This notification was sent using @nutifar/web.",
  );

  const [data, setData] = useState("{}");

  return (
    <PlaygroundCard
      title="Send Push Notification"
      subtitle="Send a push to this registered device."
    >
      <div className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full rounded-lg border border-neutral-700 bg-transparent px-4 py-2"
        />

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-neutral-700 bg-transparent px-4 py-2"
        />

        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          rows={5}
          placeholder='{"screen":"dashboard"}'
          className="font-mono w-full rounded-lg border border-neutral-700 bg-transparent px-4 py-2"
        />

        <button
          disabled={disabled || loading}
          onClick={() => onSend(title, body, data)}
          className="rounded-lg bg-white px-5 py-2 text-black"
        >
          Send Notification
        </button>
      </div>
    </PlaygroundCard>
  );
}
