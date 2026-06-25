const BASE_URL = "http://localhost:8000";

export const getImage = (path) => {
  if (!path) return "https://via.placeholder.com/150";

  if (path.startsWith("http")) return path;

  return `${BASE_URL}${path}`;
};