interface PlaygroundCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export default function PlaygroundCard({
  title,
  subtitle,
  children,
  className,
}: PlaygroundCardProps) {
  return (
    <div
      className={`rounded-xl border border-neutral-800 bg-neutral-900 ${className}`}
    >
      <div className="border-b border-neutral-800 px-6 py-4">
        <h2 className="font-semibold">{title}</h2>

        {subtitle && (
          <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>
        )}
      </div>

      <div className="p-6">{children}</div>
    </div>
  );
}
