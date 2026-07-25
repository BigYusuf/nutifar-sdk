interface Props {
  title: string;
  description: string;
}

export default function EmptyState({ title, description }: Props) {
  return (
    <div className="py-12 text-center">
      <p className="font-medium">{title}</p>

      <p className="mt-2 text-neutral-500">{description}</p>
    </div>
  );
}
