import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHeaderName, setscreenSnipper } from "../../../redux/initialData";
import Moreuser from "../../userdetail/moreuser";

const Users = () => {
  const rdata = useSelector((e) => e.data.value);
  const data = rdata.data;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setscreenSnipper(true))
    setTimeout(() => {
      dispatch(setscreenSnipper(false))
    }, 500);
    dispatch(setHeaderName("سبد ها"));
  }, []);

  return (
    <div className="" dir="rtl">
      <Moreuser data={data} parent="users" />
    </div>
  );
};
export default Users;
