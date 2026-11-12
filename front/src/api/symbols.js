// src/api/symbols.js
import api from "./axios";

export async function fetchSymbols() {
  const { data } = await api.get("/api/symbols");
  return data;
}
export async function fetchSymbolPortfolio(symbol) {
  const { data } = await api.post(`/api/symbols/${symbol}`);
  return data;
}

export async function validateSymbol(symbolCode) {
  try {
    const { data } = await api.post(`/api/symbols/${symbolCode}`);
    return data; // اگر معتبر باشد اطلاعات سهم را برمی‌گرداند
  } catch (error) {
    // throw new Error("نماد مورد نظر در سامانه موجود نیست!");
    return null
  }
}
