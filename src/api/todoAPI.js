import { apiDelete, apiGet } from ".";
import { API_URL } from "./constant";

export const getAllTodosAPI = () => apiGet(`${API_URL}/todo/get-todos`);

export const removeTodoAPI = (id) =>
  apiDelete(`${API_URL}/todo/delete-todo/${id}`);
