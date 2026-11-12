import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchDashboard, fetchDashboardChart, fetchDueDateList, updateDueDateList } from "../api/dashboard";
import { queryClient } from "../main";
import { useEffect, useState } from "react";
import { isWithinTimeRange } from "../utils/timeZone";
import moment from "moment-timezone";
export function useDashboard(){

    return useQuery({
        queryKey:['dashboard'],
        queryFn:() => fetchDashboard(),
        keepPreviosData:true,
        refetchInterval: () => {
      const now = moment().tz('Asia/Tehran');
      const hours = now.hours();
      const minutes = now.minutes();
      if (hours >= 9 && hours <= 12 && minutes <= 30) {
        return 60000;
      }
      return false;
    },
    })
}

export function useDueDateList(){
    const data = useQuery({
        queryKey:['due-date-list'],
        queryFn:() => fetchDueDateList(),
    })
     const updateMut = useMutation({
        mutationFn: ( id ) => updateDueDateList(id),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["due-date-list"] });
          queryClient.invalidateQueries({ queryKey: ["portfolios"] });
        },
      });

      return {...data,updateMut}
}
