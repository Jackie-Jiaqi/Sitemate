var express = require("express");
var cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const port = 3001;
let issues = [
  { id: 1, title: "issues1", description: "issues1 description" },
  { id: 2, title: "issues2", description: "issues2 description" },
  { id: 3, title: "issues3", description: "issues3 description" },
];
// Create
app.post("/api/issues", (req, res) => {
  const issue = req.body;
  console.log("Created issue:", issue);
  issues.push(issue);
  res.status(201).json(issue);
});

// Read (single issue)
app.get("/api/issues/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const issue = issues.filter((issue) => issue.id === id);
  console.log(issues, "issue");
  res.json(issue);
});

// Read (all issues)
app.get("/api/issues/", (req, res) => {
  res.json(issues);
});

// Update
app.put("/api/issues/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedIssue = req.body;
  console.log("Updated issue:", updatedIssue);
  issues = issues.map((issue) => (issue.id === id ? updatedIssue : issue));
  res.json(updatedIssue);
});

// Delete
app.delete("/api/issues/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  console.log("Deleted issue with id:", id);
  issues = issues.filter((issue) => issue.id !== id);
  res.status(204).send();
});
app.listen(port, () => {
  console.log("listen to port " + port);
});
