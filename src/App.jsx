import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import AdminPanel from "./components/admin/AdminPanel";
import LoadingSpinner from "./components/common/LoadingSpinner";
import CourseView from "./components/courses/CourseView";

function AppContent() {
  const { loading } = useApp();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {!isAdmin && <Sidebar />}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-white">
          <Routes>
            <Route path="/" element={<Navigate to="/courses" replace />} />
            <Route path="/courses" element={<CourseView />} />
            <Route path="/courses/:courseId" element={<CourseView />} />
            <Route
              path="/courses/:courseId/topics/:topicIndex"
              element={<CourseView />}
            />
            <Route
              path="/courses/:courseId/topics/:topicIndex/subtopics/:subtopicIndex"
              element={<CourseView />}
            />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<Navigate to="/courses" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
