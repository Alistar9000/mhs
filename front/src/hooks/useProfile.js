import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export function useProfile(username){
 const queryClient = useQueryClient()
 const data = useQuery({
        queryKey: ["user-profile"],
        queryFn: async ()=> await api.post(`/api/dashboard/profile/${username}`),
         keepPreviousData: true,
    });
 const updateMut = useMutation({
    mutationFn: async  (payload) => await api.put(`/api/dashboard/profile/${username}`,payload),
    onSuccess: () => queryClient.invalidateQueries({queryKey:["user-profile"]})
 })   
 return {...data,updateMut}
}