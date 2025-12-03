export default function ProgressBar({ progress, showLabel = true }) {
  const percentage = Math.round(progress * 100);
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span className="font-medium">{percentage}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 h-2">
        <div
          className="bg-yellow-500 h-2 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
