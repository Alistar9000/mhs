import {
  ClockFading,
  Edit,
  Edit2,
  Eye,
  EyeClosed,
  EyeOff,
  Home,
  Key,
  KeyIcon,
  KeyRound,
  KeySquare,
  User,
  UserCircle,
} from "lucide-react";
import { useCrumbs } from "../../store/store";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "../../api/axios";
import { name } from "react-date-object/calendars/julian";
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../store/auth";
import {queryClient} from "../../main";
import { useProfile } from "../../hooks/useProfile";
import { useNavigate } from "react-router-dom";
import LoginLoader from "../ui/LoginLoarder";


export default function Profile() {
  const [showEditContent, setShowEditContent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [collapseContent, setCollapseContent] = useState(null);
  const { crumbs, setCrumbs } = useCrumbs();
  const { user } = useAuthStore();
  const navigate = useNavigate()

  const { data,updateMut } = useProfile(user?.username)

  console.log(data?.data);
  const records = [
    {
      name: "name",
      icon: <User className="text-blue-500" />,
      label: "نام",
      content: data?.data?.name,
    },
    {
      name: "username",
      icon: <UserCircle className="text-blue-500" />,
      label: "نام کاربری",
      content: data?.data?.username,
    },
    {
      name: "password",
      icon: <KeySquare className="text-blue-500" />,
      label: "رمز عبور",
      content: "******",
    },
  ];
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      username:"",
      password: "",
    },
  });

  useEffect(() => {
    if (crumbs.lenght == 0) return;

    setCrumbs([
      {
        path: "/dashboard",
        label: (
          <div className="flex items-center gap-1">
            <Home size={16} /> داشبورد
          </div>
        ),
      },
      {
        path: "/dashboard/settings",
        label: <div className="flex items-center gap-1"> پروفایل</div>,
      },
    ]);
  }, []);

  const onSubmit =  (values) => {
    setLoading(true)
    setTimeout(() => {
      
      updateMut.mutate(values)
      navigate('/')
      
    }, 2000);
   
  };

  return (
    <div className="p-6 h-full w-full">
      <div className="relative overflow-hidden  md:p-6 p-6 rounded-xl border h-full w-full bg-white shadow">
                            <button onClick={()=>setShowEditContent(e=>!e)} className="rounded-xl py-2 px-3 w-fit border border-orange-500 bg-white text-orange-500 hover:bg-orange-50 flex gap-2 items-center">ویرایش حساب <Edit2 size={18}  /></button>

        <div className="relative md:z-10 h-full  w-fit bg-white flex flex-col p-10 gap-5 text-gray-400 ">

          {records.map((item, index) => (
              <div key={index} className="flex  items-center gap-3">
                <span>{item.icon}</span>
                <span>{item.label}:</span>
                <span className="text-slate-600">{item.content}</span>
                </div>
              
          ))}
        
        
        </div>
        <div className={`absolute bg-white duration-300 transition-all transform border ${showEditContent ? 'translate-x-0 md:-translate-x-2/3 opacity-100':'translate-x-1/4 opacity-0'} top-24 md:top-20 md:right-10 right-0 z-0 md:w-1/2 w-full xl:w-1/3 h-auto rounded-xl p-4`}>
            <form className={`w-full flex flex-col p-4 gap-5`} onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center gap-4"><label className="text-nowrap">نام جدید</label><input className="py-2 px-3 w-full border rounded-xl outline-none" {...register("name",{required:true})} /></div>
                <div className="flex items-center gap-4"><label className="text-nowrap">نام کاربری جدید</label><input className=" px-3 w-full py-2 outline-none border rounded-xl" {...register("username",{required:true})} /></div>
                <div className="flex items-center gap-4"><label className="text-nowrap">رمز عبور جدید</label><input className=" py-2 px-3 w-full border outline-none rounded-xl" {...register("password",{required:true})} /></div>
                <div className="flex items-center gap-2 justify-end">
                <button onClick={()=>setShowEditContent(false)} type="button" className="rounded-xl py-2 px-3 border border-red-500 hover:bg-red-50   text-red-500 bg-white">لغو</button>
               
                
                <button type="submit" className="flex items-center gap-2 rounded-xl py-2 px-3 border border-green-500 hover:bg-green-50  text-green-500 bg-white">ثبت تغییرات {loading && <LoginLoader borderColor={'border-green-600'} />}</button>
               
                </div>
            </form>

        </div>
      </div>
    </div>
  );
}
