import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import CardSnipper from "../snipper";
import Card from "../card/index/index";
import DashboardChart from "../grid/chart";
import DashboardSymbolData from "../grid/symboldata";
import DashboardData from "../grid/data";
import DashboardSabadCount from "../grid/sabadcount";
import DashboardUserList from "../grid/userlist";
import DashboardUserHeader from "../grid/userheader";
import {setHeaderName, setscreenSnipper, setUserHeaderMoreWindow} from "../../../redux/initialData";
import { useEffect } from "react";

const Dashboard = () => {
  const data = useSelector((state) => state.data.value);
  const cards = data.data;
  const snipper = data.cardsnipper;
  const dispatch = useDispatch();
  useEffect(() => {
     dispatch(setscreenSnipper(true))
        setTimeout(() => {
          dispatch(setscreenSnipper(false))
        }, 500);
    dispatch(setHeaderName("داشبورد"));
  }, []);
 
  return (
    <>
    <div
     
      className=" dashboard hidden sm:grid  sm:grid-cols-4 h-full w-full grid-cols-1 sm:grid-rows-4 gap-2 "
    >
      <DashboardChart />
      <DashboardSabadCount />
      <DashboardData />
      <DashboardUserHeader />

      <DashboardUserList />
      <DashboardSymbolData />

    </div>
    <div
    
    className=" dashboard grid sm:hidden text-[.75rem] grid-rows-[20vh_17vh_40vh_54vh_50vh_40vh]   gap-2 ">
    <DashboardData />
    <DashboardSabadCount />
    
    <DashboardChart />
    <DashboardUserHeader />

    <DashboardUserList />
    <DashboardSymbolData />

  </div>
  </>
  );
};

export default Dashboard;
