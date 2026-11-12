// src/api/portfolios.js
import api from "./axios";

// پارام‌سازی برای لیست (offset/take + filters)
export async function fetchPortfolios({
  offset = 0,
  take = 10,
  search = "",
  status = "all",
  sortBy = "return_percent",
  order = "desc",
}) {
  const params = {
    offset,
    take,
    search,
    sortBy,
    order,
    status,
  };

  const { data } = await api.post("/api/portfolios", { params });
  return data;
}

export async function fetchPortfolio(id) {
  const { data } = await api.post(`/api/portfolios/${id}`);

  return data;
}
export async function fetchPortfolioChart(id, range) {
  const { data } = await api.post(`/api/portfolios/${id}/chart`, {
   range:range
  });
  return data;
}

export async function updatePortfolio(id, payload) {
  const { data } = await api.put(`/api/portfolios/${id}`, payload);
  return data;
}

export async function deletePortfolio(id) {
  const { data } = await api.delete(`/api/portfolios/${id}`);
  return data;
}

export async function enablePortfolio(id) {
  const { data } = await api.put(`/api/portfolios/enable/${id}`);
  return data;
}

export async function disablePortfolio(id) {
  const { data } = await api.put(`/api/portfolios/disable/${id}`);
  return data;
}

export async function addPortfolio(payload) {
  const { data } = await api.post(`/api/portfolios/add`, payload);
  return data;
}

export async function searchPortfolios(query) {
  const { data } = await api.post(`/api/portfolios/search`, {
    params: { query },
  });
  return data; // انتظار: { data: [...نتایج] }
}
