import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { calculateCourseProgress } from "../../utils/localStorage";

export default function CourseCard({ course, index, isSelected, onClick }) {
  const { progressVersion } = useApp();
  const navigate = useNavigate();
  const totalSubtopics = course.topics.reduce(
    (sum, topic) => sum + topic.subtopics.length,
    0
  );
  const progress = calculateCourseProgress(index, totalSubtopics);
  const percentage = Math.round(progress * 100);

  const handleClick = () => {
    navigate(`/courses/${index}`);
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full text-left p-3 flex items-center gap-3 transition-colors ${
        isSelected
          ? "bg-yellow-100 text-gray-900"
          : "hover:bg-gray-50 text-gray-700"
      }`}
    >
      <div className="w-8 h-8 bg-yellow-500 flex items-center justify-center flex-shrink-0">
        <span className="text-white font-bold text-xs">CL</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium text-sm truncate">{course.title}</span>
          {totalSubtopics > 0 && (
            <span className="text-xs text-gray-500 font-medium flex-shrink-0">
              {percentage}%
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
