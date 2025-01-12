import { useSelector } from "react-redux";

const EditDialogeConfirm = () => {
    
    const data = useSelector(e=>e.data.value)
    const dialoge = data.editsabadconfirm
    const confirm = dialoge.confirm
    const success = dialoge.success
    return (
        
        <div className={`${!confirm && 'opacity-0 -translate-x-full'} transition-all sm:text-[1.1em] text-[.85em] duration-200 fixed left-2 top-[50%] flex justify-center place-items-center `}>
   {
   success ? <div className="h-full byekan  rounded-md w-full p-4 text-white bg-orange-400">ویرایش سبد با موفقیت انجام گردید</div>
   :<div className="h-full byekan rounded-md w-full p-4 text-white bg-[red]">ویرایش سبد ناموفق</div>
   }
    </div> );
}
 
export default EditDialogeConfirm;