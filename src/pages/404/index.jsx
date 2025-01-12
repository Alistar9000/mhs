import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div  className="flex justify-center place-items-center gap-2 byekan text-[1.3em] h-svh">
      <span className="sm:h-1/3 h-1/4 flex-col  sm:w-1/3 w-2/3 flex justify-center place-items-center rounded-lg border-2 border-sky-300 byekan text-sky-400">
      !صفحه مورد نظر یافت نشد

<NavLink to={'/dashboard'} className={'cursor-pointer text-white text-[.6em] mt-5 hover:bg-sky-300 bg-sky-500 p-2 rounded-lg '}>بازگشت به صفحه اصلی</NavLink>

      </span>

    </div>
  );
};

export default NotFound;
