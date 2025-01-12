import { useDispatch, useSelector } from "react-redux";
import {
  deleteSabadConfirm,
  disableSabadConfirm,
  setData,
  setscreenSnipper,
  showDeleteDialoge,
  showDisableDialoge,
} from "../../../redux/initialData";
import axios from "axios";
import { FetchData } from "../../../fetchdata";
import { GiProgression } from "react-icons/gi";

const DisableDialoge = () => {
  const dispatch = useDispatch();
  const data = useSelector((e) => e.data.value);
  const { flag, name, id, status } = data.showdisabledialoge;

  const YesClick = () => {
    dispatch(showDisableDialoge({ flag: false, id: id, name: name }));
    setTimeout(() => {
      dispatch(setscreenSnipper(true));
      let Status
      status == 0 ? Status =1 : Status =0;
      // const URL = `pm/disablesabad_test.php?id=${id}&status=${Status}`;
     
      setTimeout(async() => {
        
        const URL = `/disable?id=${id}&status=${Status}`;

   
      const response = await axios.get(URL);
      const res = response.data.data;
   
      dispatch(setscreenSnipper(false));
      res == false
        ? dispatch(disableSabadConfirm({ confirm: true, success: false,status:-1 }))
        : dispatch(disableSabadConfirm({ confirm: true, success: true,status:status })) &&
          FetchData(dispatch, 1, res);

      setTimeout(() => {
        dispatch(disableSabadConfirm({ confirm: false, success: true }));
      }, 5000);
    }, 1000);
    }, 500);
  };

  const NoClick = () => {
    dispatch(showDisableDialoge(false));
  };
  return (
    <>
      <div
        className={`${
          !flag && "opacity-0 z-[-1]"
        } transition-opacity duration-300 fixed w-full h-full bg-black/30 z-40`}
      ></div>
      <div
        className={`${
          !flag && "scale-[.8]  opacity-0 z-[-1]"
        }  origin-top transition-all duration-300 fixed left-[50%] z-50 -translate-x-1/2 -translate-y-1/2 flex justify-center place-items-center top-[50%] sm:w-1/3 sm:h-1/3 h-1/4 w-3/4 text-[.8em] sm:text-[1em]    rounded-xl bg-white border border-purple-300`}
      >
        <div className="px-2 grid grid-rows-[60%_40%] gap-y-4">
          {status == 0 ? (
            <div className="px-2 text-center sm:text-[1.3em] text-gray-500">
              آیا از غیرفعال کردن سبد{" "}
              <span className="text-sky-400">{name}</span> اطمینان دارید؟
            </div>
          ) : (
            <div className="px-2 text-center text-[1.3em] text-gray-500">
              آیا از فعال کردن سبد <span className="text-sky-400">{name}</span>{" "}
              اطمینان دارید؟
            </div>
          )}
          <ul
            dir="rtl"
            className="flex justify-center place-items-center *:w-20 *:text-center gap-x-6 *:cursor-pointer *:flex *:place-items-center *:justify-center *:rounded-md *:p-2 bg-white *:border "
          >
            <li onClick={YesClick} className="border-[var(--green-color)]">
              بله
            </li>
            <li onClick={NoClick} className="border-[red]">
              خیر
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DisableDialoge;
