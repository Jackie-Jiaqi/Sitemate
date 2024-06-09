const SERVER_URL = "http://localhost:3000/api/issues";

export const createIssue = async (issue) => {
  const response = await fetch(SERVER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(issue),
  });
  return response.json();
};

export const getIssue = async (id) => {
  const response = await fetch(`${SERVER_URL}/${id}`);
  return response.json();
};

export const updateIssue = async (id, issue) => {
  const response = await fetch(`${SERVER_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(issue),
  });
  return response.json();
};

export const deleteIssue = async (id) => {
  await fetch(`${SERVER_URL}/${id}`, { method: "DELETE" });
};
