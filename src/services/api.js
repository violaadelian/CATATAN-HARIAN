const API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=5';

export async function fetchPosts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
