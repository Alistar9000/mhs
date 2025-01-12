import { useDispatch } from "react-redux";
import { showDeleteDialoge } from "../../../../redux/initialData";
import './index.css';
import { FaTrash } from "react-icons/fa";

const CardCheck = ({ name, id, status }) => {
 
 
    const dispatch = useDispatch();
  
    const Trash = () => {
      dispatch(
        showDeleteDialoge({ flag: 1, name: name, id: id, type: "delete" })
      );
    };
    const DisableCard = () => {
      dispatch(
        showDeleteDialoge({ flag: 1, name: name, id: id, type: "disable" })
      );
  
      // setClick(!click);
      //setCardDisable(click);
    };
    return (
      <div className="flex  absolute bottom-2 left-2  right-2 justify-between px-2">
        {/* <FontAwesomeIcon
          onMouseLeave={() => setShowDelete(false)}
          onMouseEnter={() => setTimeout(() => setShowDelete(true), 500)}
          icon={faTrash}
          onClick={Trash}
          className="text-red-400 h-3 w-3 cursor-pointer"
        ></FontAwesomeIcon> */}
        <FaTrash 
         onClick={Trash}
         className="text-red-400 h-3 w-3 cursor-pointer"
        />
        {/* <div className={(!show && 'hidden')+" absolute  border-orange-300 bg-white z-50 -bottom-4 left-10 border  rounded-md card-disable-tooltip p-1"}>غیرفعال کردن سبد</div> */}
        {/* <div className={(!showDelete && 'hidden')+" absolute z-50 border-orange-300 -bottom-4 right-6 border bg-white rounded-md card-disable-tooltip p-1"}>حذف سبد</div> */}
  
        <div
          onClick={DisableCard}
        //   onMouseLeave={() => setShow(false)}
        //   onMouseEnter={() => setTimeout(() => setShow(true), 500)}
          className={
            "h-3 relative rounded-xl cursor-pointer " +
            (status == 0 ? "bg-blue-400" : "bg-gray-300") +
            " w-8"
          }
        >
          <div
            className={
              (status == 1 && "card-checkbox-left") +
              " absolute rounded-full card-checkbox bg-white "
            }
          ></div>
        </div>
      </div>
    );
  };
  
  export default CardCheck;