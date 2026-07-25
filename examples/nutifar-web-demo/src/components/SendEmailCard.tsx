"use client";

import { useState } from "react";

import PlaygroundCard from "./PlaygroundCard";

interface Props {
  loading: boolean;

  onSend(to: string, subject: string, html: string): void | Promise<void>;
}

export default function SendEmailCard({ loading, onSend }: Props) {
  const [to, setTo] = useState("");

  const [subject, setSubject] = useState("Nutifar Playground Test");

  const [html, setHtml] = useState(`<!DOCTYPE html>
<html>
  <body style="font-family:Arial,sans-serif;padding:24px;">
    <h2>🎉 Hello from Nutifar</h2>

    <p>
      This email was sent from the
      <strong>@nutifar/web</strong>
      SDK playground.
    </p>

    <p>
      If you're seeing this, your email
      integration is working correctly.
    </p>
  </body>
</html>`);

  function handleSample() {
    setSubject("Nutifar Playground Test");

    setHtml(`<!DOCTYPE html>
<html>
  <body style="font-family:Arial,sans-serif;padding:24px;">
    <h2>🎉 Hello from Nutifar</h2>

    <p>
      This email was sent from the
      <strong>@nutifar/web</strong>
      SDK playground.
    </p>

    <p>
      Congratulations! Your integration is working.
    </p>
  </body>
</html>`);
  }

  return (
    <PlaygroundCard
      title="Send Test Email"
      subtitle="Execute sdk.email.send() directly from your browser."
    >
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm text-neutral-400">
            Recipient
          </label>

          <input
            type="email"
            placeholder="john@example.com"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full rounded-lg border border-neutral-700 bg-transparent px-4 py-3 outline-none transition focus:border-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-400">Subject</label>

          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-lg border border-neutral-700 bg-transparent px-4 py-3 outline-none transition focus:border-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-400">HTML</label>

          <textarea
            rows={12}
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            className="w-full rounded-lg border border-neutral-700 bg-transparent p-4 font-mono text-sm outline-none transition focus:border-white"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSample}
            className="rounded-lg border border-neutral-700 px-5 py-2 hover:bg-neutral-800"
          >
            Load Sample
          </button>

          <button
            type="button"
            disabled={loading || !to}
            onClick={() => onSend(to, subject, html)}
            className="rounded-lg bg-white px-5 py-2 font-medium text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Email"}
          </button>
        </div>
      </div>
    </PlaygroundCard>
  );
}
