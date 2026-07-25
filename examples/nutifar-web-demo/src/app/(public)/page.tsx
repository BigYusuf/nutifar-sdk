import Link from "next/link";

const playgrounds = [
  {
    title: "Push Notifications",
    description:
      "Send push notifications to registered Android, iOS and Web devices.",
    href: "/playground/push",
  },
  {
    title: "Email",
    description:
      "Send transactional emails using your configured email provider.",
    href: "/playground/email",
  },
  {
    title: "In-App",
    description:
      "Test real-time in-app notifications and unread message counts.",
    href: "/playground/inapp",
  },
  {
    title: "SMS",
    description: "SMS testing playground.",
    disabled: true,
  },
];

export default function HomePage() {
  return (
    <div className="container max-w-5xl py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold">Nutifar SDK Playground</h1>

        <p className="mt-3 text-neutral-400 max-w-2xl">
          Test your Nutifar SDK integration across different notification
          channels. Choose a playground below to start sending notifications.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {playgrounds.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-neutral-800 bg-neutral-900 p-6"
          >
            <h2 className="text-xl font-semibold">{item.title}</h2>

            <p className="mt-2 text-sm text-neutral-400">{item.description}</p>

            {item.disabled ? (
              <button
                disabled
                className="mt-6 rounded-lg bg-neutral-800 px-4 py-2 text-sm text-neutral-500"
              >
                Coming Soon
              </button>
            ) : (
              <Link
                href={item.href!}
                className="mt-6 inline-flex rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-neutral-200"
              >
                Open Playground →
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
