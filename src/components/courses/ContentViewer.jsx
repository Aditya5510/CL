import { useApp } from "../../context/AppContext";
import MarkdownRenderer from "../markdown/MarkdownRenderer";
import EmptyState from "../common/EmptyState";

export default function ContentViewer() {
  const {
    courses,
    selectedCourseId,
    selectedTopicIndex,
    selectedSubtopicIndex,
  } = useApp();

  if (selectedCourseId === null) {
    return <EmptyState message="Select a course to get started" icon="📚" />;
  }

  const course = courses[selectedCourseId];
  if (!course) {
    return <EmptyState message="Course not found" />;
  }

  if (selectedTopicIndex === null) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {course.title}
        </h2>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">
            Learning Objectives
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {course.learningObjectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </div>
        <p className="text-gray-500">
          Select a topic from the sidebar to begin learning.
        </p>
      </div>
    );
  }

  const topic = course.topics[selectedTopicIndex];
  if (!topic) {
    return <EmptyState message="Topic not found" />;
  }

  if (selectedSubtopicIndex === null) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{topic.title}</h2>
        <p className="text-gray-600 mb-6">{topic.description}</p>
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900">
            Subtopics
          </h3>
          <ul className="space-y-2">
            {topic.subtopics.map((subtopic, index) => (
              <li key={index} className="text-gray-700">
                {index + 1}. {subtopic.title}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-gray-500 mt-6">
          Select a subtopic to view its content.
        </p>
      </div>
    );
  }

  const subtopic = topic.subtopics[selectedSubtopicIndex];
  if (!subtopic) {
    return <EmptyState message="Subtopic not found" />;
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        {subtopic.title}
      </h2>
      <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-code:text-gray-900 prose-pre:bg-gray-100 prose-a:text-yellow-600 prose-a:hover:text-yellow-700 prose-li:text-gray-700">
        <MarkdownRenderer content={subtopic.content} />
      </div>
    </div>
  );
}
