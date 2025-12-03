import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function Breadcrumbs() {
  const {
    courses,
    selectedCourseId,
    selectedTopicIndex,
    selectedSubtopicIndex,
  } = useApp();

  if (selectedCourseId === null) return null;

  const course = courses[selectedCourseId];
  if (!course) return null;

  const topic =
    selectedTopicIndex !== null ? course.topics[selectedTopicIndex] : null;
  const subtopic =
    topic && selectedSubtopicIndex !== null
      ? topic.subtopics[selectedSubtopicIndex]
      : null;

  const items = [
    { label: "Dashboard", path: "/courses" },
    { label: course.title, path: `/courses/${selectedCourseId}` },
  ];

  if (topic) {
    items.push({
      label: topic.title,
      path: `/courses/${selectedCourseId}/topics/${selectedTopicIndex}`,
    });
  }

  if (subtopic) {
    items.push({
      label: subtopic.title,
      path: `/courses/${selectedCourseId}/topics/${selectedTopicIndex}/subtopics/${selectedSubtopicIndex}`,
      isLast: true,
    });
  }

  return (
    <nav
      className="flex items-center gap-2 text-sm text-gray-600 mb-4"
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-gray-400"> &gt; </span>}
          {item.isLast ? (
            <span className="text-gray-900 font-medium">{item.label}</span>
          ) : (
            <Link
              to={item.path}
              className="hover:text-gray-900 transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
