import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { useEffect, useState } from "react";
import { setHeaderName, setscreenSnipper } from "../../redux/initialData";
import Symbolslist from "./list";
import UsersSymbolslist from "./users";
import { GetSymbols } from "../home/grid/symboldata";

const Symbols = () => {
  const dispatch = useDispatch();
  const data1 = useSelector((e) => e.data.value);
  const data = data1.data;

  const symboldata = GetSymbols(data, 1);
  const [usersymbol, setUserSymbol] = useState({ name: "".name, users: [] });
  const [close, setClose] = useState(false);

  useEffect(() => {
    dispatch(setscreenSnipper(true));
    setTimeout(() => {
      dispatch(setscreenSnipper(false));
    }, 500);
    dispatch(setHeaderName("لیست نمادها"));
  }, []);
  return (
    <div
      className="w-full h-full relative sm:pl-2 grid sm:grid-cols-[60%_40%] gap-2"
      dir="rtl"
    >
      <Symbolslist
        data={symboldata}
        setClose={setClose}
        setUserSymbol={setUserSymbol}
      />
      <UsersSymbolslist close={close} setClose={setClose} data={usersymbol} />
    </div>
  );
};

export default Symbols;
