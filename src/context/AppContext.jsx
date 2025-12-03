import { createContext, useContext, useState, useEffect } from "react";
import { loadCourses, loadUsers } from "../utils/dataLoader";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(null);
  const [selectedSubtopicIndex, setSelectedSubtopicIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [progressVersion, setProgressVersion] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [coursesData, usersData] = await Promise.all([
          loadCourses(),
          loadUsers(),
        ]);
        setCourses(coursesData);
        setUsers(usersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const updateProgress = () => {
    setProgressVersion((prev) => prev + 1);
  };

  const value = {
    courses,
    users,
    loading,
    error,
    selectedCourseId,
    setSelectedCourseId,
    selectedTopicIndex,
    setSelectedTopicIndex,
    selectedSubtopicIndex,
    setSelectedSubtopicIndex,
    searchQuery,
    setSearchQuery,
    sidebarOpen,
    setSidebarOpen,
    progressVersion,
    updateProgress,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
