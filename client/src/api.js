const API_BASE_URL = 'http://localhost:5004';

export async function fetchNotes(category = '') {
  let url = `${API_BASE_URL}/api/notes`;
  if (category) {
    url += `?category=${encodeURIComponent(category)}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch notes: ${response.status}`);
  }
  return response.json();
}
