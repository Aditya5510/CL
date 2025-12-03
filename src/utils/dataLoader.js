export async function loadCourses() {
  try {
    const response = await fetch("/data/cources.json");
    if (!response.ok) throw new Error("Failed to load courses");
    const data = await response.json();
    return data.courses || [];
  } catch (error) {
    console.error("Error loading courses:", error);
    return [];
  }
}

export async function loadUsers() {
  try {
    const response = await fetch("/data/users.json");
    if (!response.ok) throw new Error("Failed to load users");
    const data = await response.json();
    return data.users || [];
  } catch (error) {
    console.error("Error loading users:", error);
    return [];
  }
}
