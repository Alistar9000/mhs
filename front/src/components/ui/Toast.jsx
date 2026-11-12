import {  CheckCircle2, X, XCircle } from "lucide-react";
import { useEffect } from "react";
import { useStore } from "../../store/store";

export default function Toast(){
    const {toasts,removeToast} = useStore()
   
    return <div className="flex flex-col gap-3 fixed left-0 top-20 z-[100]">
        {toasts.map(toast => <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />)}
    </div>
}

function ToastItem({toast,removeToast}){
    const icon =
    toast.type === "success" ? (
      <CheckCircle2 size={20} className="text-green-600" />
    ) : (
      <XCircle size={20} className="text-red-600" />
    )

    const handleRemoveToast = (id) => {
      setTimeout(() => {
        removeToast(id)
      }, 1000);
    }

    return <div className="flex flex-col gap-2 relative  animate-[slideIn_5s_linear_forwards] min-w-52 overflow-hidden shadow-2xl bg-white rounded-md ">
          <X onClick={()=>removeToast(toast.id)} className="text-gray-400 mt-2 mr-2" size={16} />
            <div className="flex gap-2 items-center px-4 py-3">
                {icon}
                {toast.text}
                </div>
            <div dir="ltr" className="h-2 w-full  bg-white">
                <div onAnimationEnd={() => handleRemoveToast(toast.id)} className={`h-full ${toast.type === 'error' ? 'bg-red-600 ' : 'bg-green-600' } animate-[toastanimate_4.7s_linear_forwards] `} ></div>
             </div>
    </div>
}
