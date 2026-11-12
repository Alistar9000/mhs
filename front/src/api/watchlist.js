import api from "./axios";

export async function fetchWatchList(type) {
 
  const { data } = await api.get(`/api/watchlist?type=${type}`);
  return data;
}
export async function addWatchList(payload) {
  if(!payload) return;
 
  const { data } = await api.post(`/api/watchlist?type=${payload[0]}`,{list:payload[1]});
  return data;
}
export async function updateWatchList(payload) {
  
  const { data } = await api.put(`/api/watchlist/${payload[0]}?type=${payload[1]}`,{list:payload[2]});
  return data;
}
export async function deleteWatchList(payload) {
  const { data } = await api.delete(`/api/watchlist/${payload[0]}?type=${payload[1]}`);
  return data;
}
