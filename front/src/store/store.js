import { create } from "zustand";

export const useStore = create((set) => ({
    toasts: [],
    setToast: (toast) => set((state) => (
        {toasts:[...state.toasts,{id:Date.now(),...toast}]}
    )
  
),
    removeToast: (id) => set((state) => (
        {toasts: state.toasts.filter(e => e.id !== id)}
    ))

})) 

export const useCrumbs = create((set) => ({
    crumbs : [],
    setCrumbs: (crumb) => set({crumbs:crumb})
}))
export const useDate = create((set) => ({
    date : "",
    setDate: (date) => set({date:date})
}))

