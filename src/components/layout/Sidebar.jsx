import { useApp } from "../../context/AppContext";
import SearchBar from "../common/SearchBar";
import CourseList from "../courses/CourseList";

export default function Sidebar() {
  const { sidebarOpen, searchQuery, setSearchQuery, setSidebarOpen } = useApp();

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="h-full overflow-y-auto">
          <div className="p-4 space-y-4 border-b border-gray-200">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search"
            />
          </div>
          <div className="p-4">
            <CourseList />
          </div>
        </div>
      </aside>
    </>
  );
}
