import React, { useState, useEffect } from "react";
import {
  createIssue,
  getIssue,
  getAllIssues,
  updateIssue,
  deleteIssue,
} from "./ApiClient";
import "./App.css";
function App() {
  const [issue, setIssue] = useState({ id: "", title: "", description: "" });
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const issues = await getAllIssues();
        setResult(issues);
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };

    fetchIssues();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert id to integer if the input name is 'id'
    setIssue((prevIssue) => ({
      ...prevIssue,
      [name]: name === "id" ? parseInt(value, 10) || "" : value,
    }));
  };

  const clearForm = () => {
    setIssue({ id: "", title: "", description: "" });
  };

  const handleCreate = async () => {
    try {
      // Check for unique ID
      if (result.some((iss) => iss.id === issue.id)) {
        setError("ID already exists. Please use a unique ID.");
        return;
      }
      const createdIssue = await createIssue(issue);
      setResult((prevResult) => [...prevResult, createdIssue]);
      clearForm();
      setError("");
    } catch (error) {
      console.error("Error creating issue:", error);
    }
  };

  const handleReadAll = async () => {
    try {
      const issues = await getAllIssues();
      setResult(issues);
      clearForm();
    } catch (error) {
      console.error("Error fetching all issues:", error);
    }
  };

  const handleReadById = async () => {
    try {
      const fetchedIssue = await getIssue(issue.id);
      setResult(fetchedIssue);
      clearForm();
    } catch (error) {
      console.error("Error reading issue:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedIssue = await updateIssue(issue.id, issue);
      setResult((prevResult) =>
        prevResult.map((iss) => (iss.id === issue.id ? updatedIssue : iss))
      );
      clearForm();
    } catch (error) {
      console.error("Error updating issue:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteIssue(issue.id);
      setResult((prevResult) =>
        prevResult.filter((iss) => iss.id !== issue.id)
      );
      clearForm();
    } catch (error) {
      console.error("Error deleting issue:", error);
    }
  };

  const handleSelect = (selectedIssue) => {
    setIssue(selectedIssue);
  };

  return (
    <div className="container">
      <h1>Issue API</h1>
      <input
        type="text"
        name="id"
        placeholder="ID"
        value={issue.id}
        onChange={handleChange}
      />
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={issue.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={issue.description}
        onChange={handleChange}
      />
      <button onClick={handleCreate}>Create</button>
      <button onClick={handleReadAll}>Read All</button>
      <button onClick={handleReadById}>Read By ID</button>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <h2>Result:</h2>
        <ul>
          {result.map((item, index) => (
            <li key={index}>
              <strong>ID:</strong> {item.id} <br />
              <strong>Title:</strong> {item.title} <br />
              <strong>Description:</strong> {item.description}
              <br />
              <button onClick={() => handleSelect(item)}>Select</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
