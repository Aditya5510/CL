export default function EmptyState({ message, icon }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
      {icon && <div className="text-6xl mb-4">{icon}</div>}
      <p className="text-lg">{message}</p>
    </div>
  );
}
