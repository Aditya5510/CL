import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import {
  getSubtopicProgress,
  updateSubtopicProgress,
} from "../../utils/localStorage";
import { useState } from "react";

export default function SubtopicList({ subtopics, courseIndex, topicIndex }) {
  const {
    selectedSubtopicIndex,
    setSelectedSubtopicIndex,
    setSidebarOpen,
    updateProgress,
  } = useApp();
  const navigate = useNavigate();
  const [localProgress, setLocalProgress] = useState({});

  const handleCheckboxChange = (subtopicIndex, completed) => {
    updateSubtopicProgress(courseIndex, topicIndex, subtopicIndex, completed);
    setLocalProgress((prev) => ({
      ...prev,
      [subtopicIndex]: completed,
    }));
    updateProgress();
  };

  const handleSubtopicClick = (subtopicIndex, isSelected) => {
    if (isSelected) {
      navigate(`/courses/${courseIndex}/topics/${topicIndex}`);
      setSelectedSubtopicIndex(null);
    } else {
      navigate(
        `/courses/${courseIndex}/topics/${topicIndex}/subtopics/${subtopicIndex}`
      );
      setSelectedSubtopicIndex(subtopicIndex);
    }
    setSidebarOpen(false);
  };

  return (
    <div className="bg-gray-50 pl-6">
      {subtopics.map((subtopic, subtopicIndex) => {
        const completed =
          localProgress[subtopicIndex] !== undefined
            ? localProgress[subtopicIndex]
            : getSubtopicProgress(courseIndex, topicIndex, subtopicIndex);
        const isSelected = selectedSubtopicIndex === subtopicIndex;

        return (
          <div
            key={subtopicIndex}
            className="border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center gap-2 p-2">
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) =>
                  handleCheckboxChange(subtopicIndex, e.target.checked)
                }
                className="w-4 h-4 text-yellow-500 border-gray-300 focus:ring-yellow-500"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={() => handleSubtopicClick(subtopicIndex, isSelected)}
                className={`flex-1 text-left text-sm transition-colors ${
                  isSelected
                    ? "font-semibold text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span className={completed ? "line-through opacity-50" : ""}>
                  {subtopic.title}
                </span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
