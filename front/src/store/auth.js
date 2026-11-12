import { create } from "zustand";
import api from "../api/axios";
import toast from 'react-hot-toast'
import SessionExpireToast from "../components/toasts/SessionExpireToast";
import React from "react";
import axios from "axios";


export const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,
  isFetched: false,
  lastActivity: null,

  // login method
  updateActivity: () => set({ lastActivity: Date.now() }),

  checkIdleTimeout: () => {
    const last = get().lastActivity
    if (!last) return
    const diff = Date.now() - last
    if (diff > 2 * 60 * 60 * 1000) { // بیشتر از ۲ ساعت گذشته؟
    // if (diff > 10000) { // بیشتر از ۲ ساعت گذشته؟
      const { logout } = get()
      logout(true)
    }
  },

  login: async (credentials) => {
    set({ loading: true, error: null ,isFetched:false});
    try {
      // مرحله ۱: کوکی CSRF بگیر
      await api.get("/sanctum/csrf-cookie");
      // مرحله ۲: لاگین کن
      const res = await api.post("/api/login", credentials);

      // کاربر ذخیره شد
      set({ user: res.data.user, loading: false, error: null });
      return true;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Login failed",
       
      });
      return false;
    }
  },

  // logout method
  logout: async (isFetched) => {
    try {
      await api.post("/api/logout");
    } catch (e) {
      
    } finally {
      set({ user: null,isFetched:isFetched });
      if(isFetched)
        toast.custom(t=>(React.createElement(SessionExpireToast,{t}))
      ,
        {duration:Infinity,id:'logout-toast'});
         
    }
  },

  // check if user is authenticated (مثلاً بعد از refresh)
  fetchUser: async () => {
    set({ loading: true });
    try {
      const res = await api.get("/api/user");
      set({ user: res.data, loading: false, isFetched:true });
    } catch (err) {
      set({ user: null, loading: false ,isFetched:true });
    }
  },
}));
