import axios from "axios";

const API_URL = "http://localhost:3001/api/issues";

export const createIssue = async (issue) => {
  const response = await axios.post(API_URL, issue);
  return response.data;
};

export const getIssue = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  console.log(response.data, "sss");
  return response.data;
};

export const getAllIssues = async () => {
  const response = await axios.get(`${API_URL}/`);
  console.log(response.data, "all");
  return response.data;
};

export const updateIssue = async (id, issue) => {
  const response = await axios.put(`${API_URL}/${id}`, issue);
  return response.data;
};

export const deleteIssue = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
