const PROGRESS_KEY = "courseProgress";

export function getProgress() {
  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Failed to save progress:", error);
  }
}

export function updateSubtopicProgress(
  courseId,
  topicIndex,
  subtopicIndex,
  completed
) {
  const progress = getProgress();
  if (!progress[courseId]) progress[courseId] = {};
  if (!progress[courseId][topicIndex]) progress[courseId][topicIndex] = {};
  progress[courseId][topicIndex][subtopicIndex] = completed;
  saveProgress(progress);
  return progress;
}

export function getSubtopicProgress(courseId, topicIndex, subtopicIndex) {
  const progress = getProgress();
  return progress[courseId]?.[topicIndex]?.[subtopicIndex] || false;
}

export function calculateTopicProgress(courseId, topicIndex, totalSubtopics) {
  const progress = getProgress();
  const topicProgress = progress[courseId]?.[topicIndex] || {};
  const completed = Object.values(topicProgress).filter(Boolean).length;
  return totalSubtopics > 0 ? completed / totalSubtopics : 0;
}

export function calculateCourseProgress(courseId, totalTopics) {
  const progress = getProgress();
  const courseProgress = progress[courseId] || {};
  let totalCompleted = 0;
  let totalSubtopics = 0;

  Object.keys(courseProgress).forEach((topicIndex) => {
    const topicProgress = courseProgress[topicIndex];
    const completed = Object.values(topicProgress).filter(Boolean).length;
    const total = Object.keys(topicProgress).length;
    totalCompleted += completed;
    totalSubtopics += total;
  });

  return totalSubtopics > 0 ? totalCompleted / totalSubtopics : 0;
}
