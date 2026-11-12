import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addWatchList, deleteWatchList, fetchWatchList, updateWatchList } from "../api/watchlist";

export function useWatchList(type){
    const queryClient = useQueryClient();
    
    const list = useQuery({
        queryKey:["watchlist",type],
        queryFn:()=> fetchWatchList(type),
    }
    )
   
    
    
    const addMut = useMutation({
    mutationFn: (data)=>addWatchList(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist",type] });      
    },
  });
    const updateMut = useMutation({
    mutationFn: updateWatchList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist",type] });      
    },
  });
    const deleteMut = useMutation({
    mutationFn: deleteWatchList,
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ["watchlist",type] });      
    },
  });
    
    
    return {
        ...list,
        addMut,
        updateMut,
        deleteMut,
    }
}