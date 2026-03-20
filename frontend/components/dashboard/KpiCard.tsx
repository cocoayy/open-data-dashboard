type KpiCardProps = {
  title: string;
  value: string | number;
  description?: string;
};

export default function KpiCard({ title, value, description }: KpiCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
      {description && (
        <p className="mt-2 text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
}