import { FaArrowUp, FaCircle } from "react-icons/fa";

const ToolbarValuesItem = ({value,gain,label,index,plus}) => {
    return (
        <div
        className={`rounded-lg bg-white  place-items-center justify-center flex-col flex ${
          index !== 4 ? "gap-1" : "gap-2"
        } text-slate-600 px-2 py-1`}
        style={{  fontSize: ".8em" ,fontFamily:'byekan'}}
      >
        {label + " :"}
        {index === 1 ? (
          <span
            className=" flex place-items-center gap-x-2 text-gray-600"
            style={{ fontSize: ".85rem" }}
          >
            {value}
            <FaArrowUp
              style={{
                width: "12px",
                height: "12px",
                rotate: gain > 0 ? "45deg" : "125deg",
                color: gain >= 0 ? "#30E61C" : "red",
              }}
            />
          </span>
        ) : index !== 4 && index !== 2 ? (
          <span className="text-gray-600" style={{ fontSize: ".85rem" }}>
            {value}
          </span>
        ) : index === 2 ? (
          <span
            className="text-gray-600 flex place-items-center gap-x-1"
            style={{ fontSize: ".85rem" }}
          >
            {value}
            <span
              style={{
                // fontSize: ".9em",
                background: gain >= 0 ? "#30E61C" : "red",
              }}
              className={` rounded-xl  px-1 text-white`}
            >
              {Math.abs(gain).toFixed(2)}
            </span>
          </span>
        ) : (
          <div className="flex gap-3 ">
            <div className="flex gap-1">
              <FaCircle style={{ color: "#30E61C" }} className="mt-1" />
              <span
                className="text-gray-600"
                style={{ fontSize: ".85rem" }}
              >
                {value}
              </span>
            </div>
            <div className="flex gap-1">
              <FaCircle style={{ color: "red" }} className="mt-1" />
              <span
                className="text-gray-600"
                style={{ fontSize: ".85rem" }}
              >
                {plus}
              </span>
            </div>
          </div>
        )}
      </div>
      );
}
 
export default ToolbarValuesItem;