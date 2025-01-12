import { useSelector } from "react-redux";

const DeleteDialogeConfirm = () => {
    
    const data = useSelector(e=>e.data.value)
    const dialoge = data.deletesabadconfirm
    const confirm = dialoge.confirm
    const success = dialoge.success
    return (
        
        <div className={`${!confirm && 'opacity-0 -translate-x-full'} sm:text-[1.1em] text-[.85em] transition-all duration-200 fixed left-2 top-[50%] flex justify-center place-items-center `}>
   {
   success ? <div className="h-full byekan  rounded-md w-full p-4 text-white bg-[var(--green-color)]">با موفقیت حذف گردید</div>
   :<div className="h-full byekan rounded-md w-full p-4 text-white bg-[red]">حذف سبد ناموفق</div>
   }
    </div> );
}
 
export default DeleteDialogeConfirm;