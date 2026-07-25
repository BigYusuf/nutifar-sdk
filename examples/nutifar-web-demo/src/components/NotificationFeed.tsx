import PlaygroundCard from "./PlaygroundCard";
import { PushNotification } from "../types";

interface Props {
  notifications: PushNotification[];
}

export default function NotificationFeed({ notifications }: Props) {
  return (
    <PlaygroundCard title="Received Notifications">
      {notifications.length === 0 ? (
        <div className="py-10 text-center text-neutral-500">
          Waiting for notifications...
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="rounded-lg border border-neutral-800 p-4"
            >
              <h3 className="font-semibold">🔔 {notification.title}</h3>

              <p className="mt-2 text-sm">{notification.body}</p>

              <p className="mt-4 text-xs text-neutral-500">
                {notification.receivedAt}
              </p>
            </div>
          ))}
        </div>
      )}
    </PlaygroundCard>
  );
}
