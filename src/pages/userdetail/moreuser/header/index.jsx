import { useState } from "react";
import { BiSort, BiSortDown, BiSortUp } from "react-icons/bi";
import { BsSortAlphaUp, BsSortDown } from "react-icons/bs";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { GrSort } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { setUsersSort } from "../../../../redux/initialData";
import { useMediaQuery } from "react-responsive";

const Up = ({ rotate, sort, setSort, name, trend }) => {
  const [show, setShow] = useState(false);
  const rdata = useSelector((e) => e.data.value);
  const dispatch = useDispatch();
  const rsort = rdata.userssort;
  const handleclick = () => {
    rsort.name !== name || rsort.trend !== trend
      ? dispatch(setUsersSort({ name: name, trend: trend }))
      : dispatch(setUsersSort({ name: "", trend: "" }));
  };
  return (
    <BiSortUp
      onClick={handleclick}
      className={`cursor-pointer    h-[3vh]   ${rotate == 1 && "rotate-180"}  ${
        rsort.name === name && rsort.trend === trend
          ? "text-sky-400"
          : "text-gray-400"
      }`}
    />
  );
};

const UsersHeader = ({ data, sort, setSort, parent, index,width }) => {
  const { name, sname } = data;
  const mobilescreen = useMediaQuery({query:'(max-width:600px)'})
  return (
    <>
      <div
      // style={{width:parent==='users' && mobilescreen && width}}
        className={`flex bg-slate-50 h-full  ${
          index == 1
            ? "justify-start pr-2 sm:pr-0"
            : parent === "users" && index !== 1
            ? "justify-start"
            : "justify-start pr-2 sm:justify-start"
        } place-items-center  gap-x-1   h-full`}
      >
        {name}

        <div className="h-full">
          {name !== "نماد" && parent === "users" && sname!=='' && (
            <div className="flex  gap-x-1">
              <Up sort={sort} setSort={setSort} name={sname} trend={"up"} />
              <Up
                rotate={1}
                sort={sort}
                setSort={setSort}
                name={sname}
                trend={"down"}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UsersHeader;
