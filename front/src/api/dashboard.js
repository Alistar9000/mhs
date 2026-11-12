import api from "./axios";

export async function fetchDashboard() {
  const { data } = await api.get("/api/dashboard");
  return data;
}
export async function fetchDashboardChart(range) {
  const { data } = await api.post("/api/dashboard/chart", { range: range });
  return data;
}
export async function fetchDueDateList() {
  const { data } = await api.get("/api/dashboard/due_date_list");
  return data;
}
export async function updateDueDateList(id) {
  const { data } = await api.post(`/api/dashboard/due_date_list/${id}`);
  return data;
}
