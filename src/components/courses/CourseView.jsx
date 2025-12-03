import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import Breadcrumbs from "../layout/Breadcrumbs";
import ContentViewer from "./ContentViewer";

export default function CourseView() {
  const params = useParams();
  const {
    courses,
    selectedCourseId,
    selectedTopicIndex,
    selectedSubtopicIndex,
    setSelectedCourseId,
    setSelectedTopicIndex,
    setSelectedSubtopicIndex,
  } = useApp();

  useEffect(() => {
    if (courses.length === 0) return;

    const courseId = params.courseId ? parseInt(params.courseId) : null;
    const topicIndex = params.topicIndex
      ? parseInt(params.topicIndex)
      : null;
    const subtopicIndex = params.subtopicIndex
      ? parseInt(params.subtopicIndex)
      : null;

    if (courseId !== null && courseId !== selectedCourseId) {
      setSelectedCourseId(courseId);
    }
    if (topicIndex !== selectedTopicIndex) {
      setSelectedTopicIndex(topicIndex);
    }
    if (subtopicIndex !== selectedSubtopicIndex) {
      setSelectedSubtopicIndex(subtopicIndex);
    }
  }, [
    params.courseId,
    params.topicIndex,
    params.subtopicIndex,
    courses.length,
    selectedCourseId,
    selectedTopicIndex,
    selectedSubtopicIndex,
    setSelectedCourseId,
    setSelectedTopicIndex,
    setSelectedSubtopicIndex,
  ]);

  return (
    <>
      <Breadcrumbs />
      <ContentViewer />
    </>
  );
}
