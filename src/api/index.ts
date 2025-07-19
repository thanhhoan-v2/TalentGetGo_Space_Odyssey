// Simple fetch wrapper for SWAPI
export async function getFromLocalUrl<T = unknown>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching from URL:', url, error);
    throw error;
  }
}
