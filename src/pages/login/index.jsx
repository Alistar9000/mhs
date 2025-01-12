import { Link, NavLink, useNavigate } from "react-router-dom";
import "./index.css";
import Home from "../home/index/index";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setButtonSnipper, setscreenSnipper } from "../../redux/initialData";
import ScreenSnipper from "../../Snipper/screen";
import './index.css';
import ButtonSnipper from "../../Snipper/button";
const Login = () => {
 
  const username = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [showuser, setShowUser] = useState(false);
  const [showpass, setShowPass] = useState(false);
  const [snipper, setSnipper] = useState(false);
  const [errormessage,setErrorMessage] = useState(false);
  const [success,setSuccess] = useState(false)
  const dispatch = useDispatch();
  
  const User = [
   
  {
    user: "admin",
    pass: "admin",
  }

];

  useEffect(()=>{
   success && navigate('/dashboard');
  },[success]);
  const VerifyUser = (user,pass)=>{
    setSnipper(true)

    setTimeout(() => {

     if(User.some(e=>e.user === user) && User.some(e=>e.pass === pass) )
      {
       const index = User.findIndex(e=>e.user === user);
       
        localStorage.setItem("User", JSON.stringify(User[index]));
        setSuccess(true);
      }else  setErrorMessage(true);
      setSnipper(false)
        
    }, 1000);
   
  }
  const handlesubmit = (e) => {
    // e.preventDefault();
    setErrorMessage(false);
    username.current.value === "" && setShowUser(true);
    password.current.value === "" && setShowPass(true);

    username.current.value !== "" && password.current.value !== "" &&
      VerifyUser(username.current.value,password.current.value);
    
   
  };
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center place-items-center">
      <ScreenSnipper />
      
     
      <div className="h-1/2 login w-[80%] grid grid-rows-[15%_85%] sm:w-1/5">
      <div className="flex place-items-center justify-center w-full h-full rounded-t-lg byekan text-[1.2rem] text-white  bg-violet-400/90 ">
            مدیریت هوشمند سبد
          </div>
          <div className=" w-full relative z-10 rounded-xl rounded-t-none border-violet-400/50 border-2">
          <form
          dir="rtl"
          className="h-full  grid grid-rows-3"
          // onSubmit={handlesubmit}
        >
         
          <div className="flex place-items-end  sm:h-[90%] justify-center">
            <div className="grid w-2/3  sm:h-3/4 h-2/3  grid-rows-[30%_70%]">
              <label
                htmlFor="username"
                className="sm:text-[.7em] text-[.7em] px-2    text-gray-400"
              >
                نام کاربری
              </label>
              <input
                onChange={() => setShowUser(false)}
                ref={username}
                type="text"
                id="username"
                className="rounded-lg w-full h-full outline-sky-300 text-[.8em] text-gray-600 px-3 border"
              />
              {showuser && (
                <span className="text-[red] italic pt-0.5 px-2 text-[.6em]">
                  نام کاربری نمی تواند خالی باشد!
                </span>
              )}
            </div>
          </div>

          <div className="flex place-items-end sm:h-[90%] justify-center">
            <div className="grid w-2/3 sm:h-3/4 h-2/3  grid-rows-[30%_70%]">
              <label
                htmlFor="password"
                className="sm:text-[.7em] text-[.7em] px-2    text-gray-400"
              >
                رمز عبور
              </label>
              <input
                onChange={() => setShowPass(false)}
                ref={password}
                type="password"
                id="password"
                className="rounded-lg text-gray-600 w-full h-full outline-sky-300 px-3 border"
              />
              {showpass && (
                <span className="text-[red] italic   px-2 text-[.6em]">
                  رمز عبور نمی تواند خالی باشد!
                </span>
              )}
            </div>
          </div>
<div className=" flex justify-center place-items-center ">
  {/* <div className="w-2/3 h-full flex place-items-end"> */}
  
{/* <div className="h-3/4 grid-rows-[60%_40%]   grid w-full "> */}
<span onClick={handlesubmit}  className="w-2/3  gap-x-4 sm:h-1/2 py-2 sm:py-0 cursor-pointer border-2 byekan border-teal-300 text-teal-600  rounded-lg flex justify-center place-items-center">
{snipper && <ButtonSnipper />}

 ورود
            </span>

         

{/* </div> */}
{/* </div>      */}
</div>
         
        </form>
        <div className={` absolute bottom-0 sm:left-12 left-11 sm:h-8 h-6 w-2/3 transition-translate z-[3] duration-300 rounded-t-lg italic ${errormessage ? 'translate-y-0':'translate-y-full  border-none'} `}>
          {errormessage && <span className="text-[red] pt-1 sm:text-[.7em] text-[.6em] flex justify-center place-items-center w-full h-full">نام کاربری یا رمز عبور اشتباه است!</span>}

          </div>
          <div className={` absolute bg-white -bottom-1  sm:h-8 h-8 w-full  z-[4] duration-300  translate-y-full `}>

          </div>
          </div>
       
      </div>
    
    </div>
    
  );
};

export default Login;
