interface Props {
  title: string;
  description?: string;
}

export default function SectionHeader({ title, description }: Props) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold">{title}</h1>

      {description && (
        <p className="mt-2 text-neutral-400 max-w-2xl">{description}</p>
      )}
    </div>
  );
}
