import { useApp } from "../../context/AppContext";
import CourseCard from "./CourseCard";
import TopicList from "./TopicList";

export default function CourseList() {
  const { courses, searchQuery, selectedCourseId, setSelectedCourseId } =
    useApp();

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCourse =
    selectedCourseId !== null ? courses[selectedCourseId] : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
          Courses
        </h2>
        {filteredCourses.length === 0 ? (
          <div className="text-center text-gray-400 py-4 text-sm">
            {searchQuery ? "No courses found" : "No courses available"}
          </div>
        ) : (
          <div className="space-y-1">
            {filteredCourses.map((course, index) => (
              <CourseCard
                key={index}
                course={course}
                index={index}
                isSelected={selectedCourseId === index}
                onClick={() => setSelectedCourseId(index)}
              />
            ))}
          </div>
        )}
      </div>
      {selectedCourse && (
        <div>
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
            Topics
          </h2>
          <TopicList course={selectedCourse} courseIndex={selectedCourseId} />
        </div>
      )}
    </div>
  );
}
