import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { calculateTopicProgress } from "../../utils/localStorage";
import SubtopicList from "./SubtopicList";

export default function TopicList({ course, courseIndex }) {
  const {
    selectedTopicIndex,
    setSelectedTopicIndex,
    searchQuery,
    progressVersion,
  } = useApp();
  const navigate = useNavigate();

  const filteredTopics = course.topics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.subtopics.some((subtopic) =>
        subtopic.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  if (filteredTopics.length === 0) {
    return (
      <div className="px-4 py-2 text-sm text-gray-400">No topics found</div>
    );
  }

  const handleTopicClick = (topicIndex, isSelected) => {
    if (isSelected) {
      navigate(`/courses/${courseIndex}`);
      setSelectedTopicIndex(null);
    } else {
      navigate(`/courses/${courseIndex}/topics/${topicIndex}`);
      setSelectedTopicIndex(topicIndex);
    }
  };

  return (
    <div className="bg-white">
      {filteredTopics.map((topic, topicIndex) => {
        const originalIndex = course.topics.indexOf(topic);
        const isSelected = selectedTopicIndex === originalIndex;
        const progress = calculateTopicProgress(
          courseIndex,
          originalIndex,
          topic.subtopics.length
        );
        const percentage = Math.round(progress * 100);

        return (
          <div
            key={originalIndex}
            className="border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center gap-2 p-2">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleTopicClick(originalIndex, isSelected)}
                className="w-4 h-4 text-yellow-500 border-gray-300 focus:ring-yellow-500"
              />
              <button
                onClick={() => handleTopicClick(originalIndex, isSelected)}
                className={`flex-1 text-left text-sm transition-colors ${
                  isSelected
                    ? "font-semibold text-gray-900"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span>{topic.title}</span>
                  {topic.subtopics.length > 0 && (
                    <span className="text-xs text-gray-500 font-medium flex-shrink-0">
                      {percentage}%
                    </span>
                  )}
                </div>
              </button>
            </div>
            {isSelected && (
              <SubtopicList
                subtopics={topic.subtopics}
                courseIndex={courseIndex}
                topicIndex={originalIndex}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
