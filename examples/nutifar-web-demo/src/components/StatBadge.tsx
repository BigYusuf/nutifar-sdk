interface Props {
  label: string;
  value: string;
}

export default function StatBadge({ label, value }: Props) {
  return (
    <div className="rounded-lg border border-neutral-800 p-4">
      <p className="text-xs text-neutral-500 uppercase">{label}</p>

      <p className="mt-2 text-lg font-semibold">{value}</p>
    </div>
  );
}
