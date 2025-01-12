import "./Layout.css";
import { useMediaQuery } from "react-responsive";
import Main from "./Main";
import RightSide from "./RightSide/index";
import { useDispatch } from "react-redux";
import {sethidefloatingsearch, setUserHeaderMoreIndex, setUserListMoreIndex, setUsersMoreIndex } from "./redux/initialData";
import { useEffect } from "react";
import { FetchData } from "./fetchdata";
import DeleteDialoge from "./Dialoges/delete/index";
import DeleteDialogeConfirm from "./Dialoges/delete/confirm";
import ScreenSnipper from "./Snipper/screen";
import DisableDialoge from "./Dialoges/disable/index";
import DisableDialogeConfirm from "./Dialoges/disable/confirm";
import AddDialogeConfirm from "./Dialoges/add/confirm";
import EditDialogeConfirm from "./Dialoges/edit/confirm";
import Brand from "./RightSide/brand";
import Account from "./LeftSide/account";

const Layout = () => {
  const dispatch = useDispatch()
  const mobilescreen = useMediaQuery({ query: "(max-width:600px)" });

  const handleClick = (e)=> {
  !e.target.classList.contains('user-more-window') && dispatch(setUsersMoreIndex(null))
   && dispatch(setUserListMoreIndex(null))
  && dispatch(setUserHeaderMoreIndex(null));
  
  }

  useEffect(()=>{
    FetchData(dispatch,0,'');
  },[])

  return (
    <>
    <div
    onClick={handleClick}
    className="bg-zinc-100 sm:text-[1vw]  grid w-[100vw] h-[100vh] sm:grid-rows-1 grid-rows-[6vh_auto]  grid-cols-1 sm:grid-cols-[88vw_12vw]">
      <div dir="rtl" className="sm:hidden border-b bg-white flex justify-between">
      <Brand />
      <Account />
      </div>
      <Main />
      <div className="hidden sm:block">
        <RightSide />
      </div>
      
      <DeleteDialoge />
      <DeleteDialogeConfirm />
      <DisableDialoge />
      <DisableDialogeConfirm />
      <EditDialogeConfirm />
      <AddDialogeConfirm />
      <ScreenSnipper />
    </div>
    <div className="sm:hidden">
    <RightSide />
    </div>
    
    </>
  );
};

export default Layout;
