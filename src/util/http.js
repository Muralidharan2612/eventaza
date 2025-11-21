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

export async function createEvents(formData) {
  const url = `http://localhost:3000/events`;

  const response = await fetch(url, {
    body: JSON.stringify(formData),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occured while creating events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}
