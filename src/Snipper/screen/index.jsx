import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import img from './mhs.png';
import { setscreenSnipper } from '../../redux/initialData';


const ScreenSnipper = () => {
     const data = useSelector(e=>e.data.value)
     const flag = data.screensnipper
    return ( <div className={`${!flag && 'z-[-1] opacity-0' } z-50 transition-all duration-300 h-full w-full flex justify-center place-items-center fixed bg-gray-400/55`}>
{/* <div className="w-14 h-14 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-full border-l-[8px] border-l-transparent screen-snipper   border-t-[8px] border-r-[8px] border-b-[8px] border-gray-500">
</div> */}
<div className="rounded-lg bg-white p-4 grid sm:grid-rows-[70%_30%] grid-rows-[70%_30%] justify-center place-items-center sm:h-[30%] sm:w-[15%] h-[20%] w-[50%] ">
<div className=" grid place-items-center justify-center  grid-rows-[60%_40%] h-full w-full">
<div className="w-full h-full  flex justify-center place-items-center">
<img src={img} className='h-full sm:mw-2/3' />

    </div>
    <div className="w-full h-full">
    <span className='text-green-400 byekan  sm:text-[1.2em] text-[.9em] font-bold'>مدیریت هوشمند سبد</span>

    </div>
</div>
<div className="flex place-items-end sm:place-items-center  justify-center w-full h-full">

<div className="loading flex  gap-x-1  *:h-2    place-items-center justify-center  *:w-2 *:rounded-full *:bg-amber-400">
<div className=""></div>
<div className=""></div>
<div className=""></div>
</div>



</div>

</div>

</div>

  );
}
 
export default ScreenSnipper;