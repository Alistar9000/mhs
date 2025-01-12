import { useSelector } from "react-redux";

const DisableDialogeConfirm = () => {
    
    const data = useSelector(e=>e.data.value)
    const dialoge = data.disablesabadconfirm
    const {confirm,success,status} = dialoge
    
    return (
        
        <div className={`${!confirm && 'opacity-0 -translate-x-full'} transition-all sm:text-[1.1em] text-[.85em] duration-200 fixed left-2 top-[50%] flex justify-center place-items-center `}>
   {status==0 ?
   (success ? <div className="h-full byekan rounded-md w-full p-4 text-white bg-sky-500">با موفقیت غیرفعال گردید</div>
   :<div className="h-full byekan rounded-md w-full p-4 text-white bg-[red]">عملیات ناموفق</div>
   ):(
    success ? <div className="h-full byekan  rounded-md w-full p-4 text-white bg-sky-500">با موفقیت فعال گردید</div>
   :<div className="h-full byekan rounded-md w-full p-4 text-white bg-[red]">عملیات ناموفق</div>
   
   )}
    </div> );
}
 
export default DisableDialogeConfirm;