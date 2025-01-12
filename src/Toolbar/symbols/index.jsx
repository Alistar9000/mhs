import { useSelector } from "react-redux";
import "./index.css";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
const SymbolList = () => {
  const redux = useSelector((e) => e.data.value);
  const symbolbar = useRef();
  const symbol = useRef();
  const [interrupt, setInterrrupt] = useState(false);
  const data = [...redux.toolbar[1]];
  const mobilescreen = useMediaQuery({ query: "(max-width:600px)" });

  data.forEach((e, i) => {
    mobilescreen ? i < 3 && data.push(e) : i < 11 && data.push(e);
  });

  const handleMouseEnter = () => {
    setInterrrupt(true);
  };
  const handleMouseLeave = () => {
    setInterrrupt(false);
  };
  useEffect(() => {
  
    const autoScroll = setInterval(() => {
      if (symbolbar.current)
        symbolbar.current.scrollLeft -=
          Math.floor(symbolbar.current.scrollLeft) ===
          symbolbar.current.offsetWidth - symbolbar.current.scrollWidth
            ? symbolbar.current.scrollLeft
            : 0.01;
    }, 30);

    interrupt && clearInterval(autoScroll);

    return () => {
      clearInterval(autoScroll);
    };
  }, [interrupt]);

  return (
    <div
      className="flex bg-white  justify-center overflow-hidden text-[.8em]"
      dir="rtl"
    >
      <div
        ref={symbolbar}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`sm:w-[82.2vw]  symbol-toolbar rounded-lg  border-fuchsia-300    h-full grid grid-flow-col place-items-center sm:gap-x-2  overflow-auto`}
      >
        {data.map((e) => (
          <div
            ref={symbol}
            className="flex gap-x-1 bg-white h-3/4 place-items-center rounded-lg justify-center text-gray-400 w-[33.33vw]  sm:w-[7vw] "
          >
            <div className="byekan font-semibold">{e.name}</div>
            <div>:</div>
            <div
              className={`${e.percent >= 0 ? "text-green-600" : "text-[red]"}`}
            >
              {Math.abs(e.percent) + "%"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SymbolList;
