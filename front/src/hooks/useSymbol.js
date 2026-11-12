import { useQuery } from "@tanstack/react-query";
import { fetchSymbolPortfolio, fetchSymbols } from "../api/symbols";
import moment from "moment-timezone";

export function useSymbols(){
    return useQuery({
        queryKey:["symbols"],
        queryFn:()=>fetchSymbols(),
        // staleTime: 1000 * 30,
        retry: 1,
        keepPreviousData: true,
        refetchInterval: () => {
                  const now = moment().tz('Asia/Tehran');
                  const hours = now.hours();
                  const minutes = now.minutes();
                  if (hours >= 9 && hours <= 12 && minutes <= 30) {
                    return 60000;
                  }
                  return false;
                },
    }
    )  
}
export function useSymbolPortfolio(symbol){
    return useQuery({
        queryKey:["symbol_portfolio",symbol],
        queryFn:()=> fetchSymbolPortfolio(symbol),
    }
    )  
}