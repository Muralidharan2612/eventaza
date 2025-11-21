export async function fetchEvents(signal, title = "") {
  const url = new URL("http://localhost:3000/events");
  if (title) {
    url.searchParams.append("search", title);
  }

  const response = await fetch(url.toString(), { signal: signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}
