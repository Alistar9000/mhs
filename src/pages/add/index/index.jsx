import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { useEffect, useState } from "react";
import {
  addSabadConfirm,
  editSabadConfirm,
  setFloatingsearchId,
  setFormEmptyCheck,
  setHeaderName,
  sethidefloatingsearch,
  setPortfoEmptyCheck,
  setRepeatUser,
  setscreenSnipper,
} from "../../../redux/initialData";
import AddInfo from "../info";
import AddPortfo from "../portfo";
import FormErrorMessages from "./error";
import axios from "axios";
import { FetchData } from "../../../fetchdata";

const PostRequest = async (data, dispatch, type, resetFormData) => {
  setTimeout(() => {
    dispatch(setscreenSnipper(true));

    setTimeout(() => {
      dispatch(setscreenSnipper(false));
      const URL = "/pm/add_new.php";
      // const URL = "http://www.signal365.ir/pm/add_new.php";
      // const URL = "http://www.mhs365.ir/pm/add_new.php";

      fetch(URL, {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((e) => e.json())
        .then((e) => {
          // resetFormData();

          if (e.data != false) {
            console.log('response : ',e.data);
            type === "edit"
              ? dispatch(editSabadConfirm({ confirm: true, success: true }))
              : dispatch(addSabadConfirm({ confirm: true, success: true }));

            FetchData(dispatch, 1, e.data);
          } else {
            console.log('response : ',e.data);
            type === "edit"
              ? dispatch(editSabadConfirm({ confirm: true, success: false }))
              : dispatch(addSabadConfirm({ confirm: true, success: false }));
          }
          // dispatch(sethidefloatingsearch(0));
        })
        .catch((e) => console.log(e));
      setTimeout(() => {
        type === "edit"
          ? dispatch(editSabadConfirm({ confirm: false, success: true }))
          : dispatch(addSabadConfirm({ confirm: false, success: true }));
      }, 5000);
      dispatch(setFloatingsearchId(""));
    }, 1000);
  }, 0);
};

const InputValidation = (formData, dispatch) => {
  let valid = true;
  let portfo_check = false;
  formData.portfo.map((e) => {
    if (
      (e.name !== "" && e.count === "") ||
      (e.name === "" && e.count !== "")
    ) {
      valid = false;
      portfo_check = true;
      dispatch(setPortfoEmptyCheck(true));
    }
    // else  dispatch(setPortfoEmptyCheck(false));
  });
  !portfo_check && dispatch(setPortfoEmptyCheck(false));

  if (formData.name == "") {
    dispatch(setFormEmptyCheck(["name", true, true]));
    valid = false;
  }
  if (
    formData.initial_money == "" &&
    dispatch(setFormEmptyCheck(["initial_money", true, true]))
  )
    valid = false;
  if (
    formData.commision == "" &&
    dispatch(setFormEmptyCheck(["commision", true, true]))
  )
    valid = false;
  if (
    formData.name !== "" &&
    !CharRegExp(formData.name) &&
    dispatch(setFormEmptyCheck(["name", false, false]))
  )
    valid = false;
  if (
    formData.initial_money !== "" &&
    !DigitRegExp(formData.initial_money) &&
    dispatch(setFormEmptyCheck(["initial_money", false, false]))
  )
    valid = false;
  if (
    formData.commision !== "" &&
    !DigitRegExp(formData.commision) &&
    dispatch(setFormEmptyCheck(["commision", false, false]))
  )
    valid = false;
  return valid;
};

const DigitRegExp = (value) => {
  let isnum = /^\d+$/.test(value);
  return isnum;
};
const CharRegExp = (value) => {
  var p = /^([\u0600-\u06FF\s(\-_)\[\]a-zA-Z0-9\u06F0-\u06F9])+$/;
  return p.test(value);
};

let counter = 0;
const Add = ({ type }) => {
  const dispatch = useDispatch();
  const editData = useSelector((e) => e.data.value);
  const editId = editData.floatingsearch;
  const users = editData.data;
  const hidefloatingsearch = editData.hidefloatingsearch;
  // const [editid,setEditId] = useState(editData.floatingsearch)
  let editdata = [];
  const portfoArray = [];
  let portfo = [{ id: 0, name: "", count: "" }];

  if (type === "edit") {
    editdata = editData?.data.filter((e) => e.id == editId);
    editdata = editdata[0];

    // console.log("editdata : ", editdata?.portfo);
    const s = editdata?.portfo ? JSON.parse(editdata.portfo) : [];

    const ss = s.map((e) =>
      portfoArray.push({ id: counter++, name: e.name, count: e.count })
    );

    // const s = p.map(e=>[...portfoArray,{id:counter++,name:e.name,count:e.count}])
    portfo = editdata?.portfo ? editdata.portfo : portfo;
    //  if(editdata?.portfo)
    //   ss = [...editdata?.portfo].map(e=>[...formData.portfo,{id:counter++,name:e.name,count:e.count}]);
  }

  // const [errorflag,setErrorFlag] = useState({name:false,initial_money:false,})

  const [formData, setFormData] = useState({
    flag: type === "edit" ? 1 : 0,
    id: type === "edit" ? editdata?.id : 0,
    name: type === "edit" ? editdata?.name : "",
    initial_money: type === "edit" ? editdata?.initial_money : "",
    certificate_date: type === "edit" ? editdata?.certificate_date : "",
    commision: type === "edit" ? editdata?.commision : "",
    garanty: type === "edit" ? editdata?.garanty : "سفته",
    portfo: type === "edit" ? portfo : [{ id: 0, name: "", count: "" }],
    national_code: type === "edit" ? editdata?.national_code : "",
    phone_number: type === "edit" ? editdata?.phone_number : "",
    address: type === "edit" ? editdata?.address : "",
    broker: type === "edit" ? editdata?.broker : "",
    symbol_gain: type === "edit" ? editdata?.symbol_gain : "0",
    sabad_bardasht: type === "edit" ? editdata?.sabad_bardasht : "0",
    status: 0,
  });

  const RepeatUser_Check = () => {
    return users.some((e) => e.name === formData.name);
  };

  const resetFormData = () => {
    setFormData({
      flag: type === "edit" ? 1 : 0,
      id: 0,
      name: "",
      initial_money: "",
      certificate_date: "",
      commision: "",
      garanty: "سفته",
      portfo: [{ id: 0, name: "", count: "" }],
      national_code: "",
      phone_number: "",
      address: "",
      broker: "",
      symbol_gain: "",
      sabad_bardasht: "",
      status: 0,
    });
  };
  const errorMessages = [
    "'نام' نمی تواند خالی باشد!",
    "'آورده' نمی تواند خالی باشد!",
    "'کارمزد' نمی تواند خالی باشد!",
    "فرمت 'نام' نادرست است!",
    "فرمت 'آورده' نادرست است!",
    "فرمت 'کارمزد' نادرست است!",
  ];

  const handleSumbit = () => {
    let valid = false;
    if (type !== "edit") valid = InputValidation(formData, dispatch);
    else {
      valid = editId != 0 && InputValidation(formData, dispatch);
    }
    if (valid) {
      if (type === "edit") PostRequest(formData, dispatch, type, resetFormData);
      else {
        !RepeatUser_Check()
          ? PostRequest(formData, dispatch, type, resetFormData)
          : dispatch(setRepeatUser(true));
      }
    }
  };
  useEffect(() => {
    dispatch(setscreenSnipper(true));
    dispatch(setRepeatUser(false));
    setTimeout(() => {
      dispatch(setscreenSnipper(false));
    }, 500);
    dispatch(setHeaderName("سبد جدید"));
    dispatch(setFormEmptyCheck(["name", false, true]));
    dispatch(setFormEmptyCheck(["initial_money", false, true]));
    dispatch(setFormEmptyCheck(["commision", false, true]));
    type === "edit" &&
      setFormData({
        ...formData,
        name: editdata?.name,
        id: editdata?.id,
        initial_money: editdata?.initial_money,
        commision: editdata?.commision,
        broker: editdata?.broker,
        national_code: editdata?.national_code,
        phone_number: editdata?.phone_number,
        certificate_date: editdata?.certificate_date,
        address: editdata?.address,
        garanty: editdata?.garanty,
        portfo: portfoArray,
        symbol_gain: editdata?.symbol_gain,
        sabad_bardasht: editdata?.sabad_bardasht,
      });
  }, [editId]);

  const handleclick = (e) => {
    !e.target.classList.contains("floating-search") &&
      !e.target.classList.contains("input-search-user") &&
      dispatch(sethidefloatingsearch(""));
  };
  return (
    <div onClick={handleclick} dir="rtl" className="w-full  h-full">
      <div className="grid sm:grid-cols-5 gap-2 ">
        <AddInfo type={type} formData={formData} setFormData={setFormData} />
        <div className="sm:col-span-2 col-span-3  grid sm:h-[83.5vh]  grid-rows-[75%_25%]">
          <AddPortfo
            type={type}
            formData={formData}
            setFormData={setFormData}
          />
          <div className="flex place-items-end sm:h-full  justify-center bg-white  sm:mb-0   rounded-b-lg">
            <div className="grid grid-cols-[60%_40%] w-full h-full">
              <div className="flex justify-center  place-items-center  w-full h-full">
                <FormErrorMessages data={errorMessages} type={type} />
              </div>
              <div className="flex justify-center sm:place-items-center place-items-center w-full h-full ">
                <button
                  onClick={handleSumbit}
                  className={`add-btn  opacity-0 rounded-lg border-2 ${
                    type === "edit"
                      ? "border-amber-300 text-amber-500"
                      : "border-green-300 text-emerald-500"
                  }  hover:shadow-lg  h-10  byekan text-[1em] w-24`}
                >
                  {type === "edit" ? "ثبت تغییرات" : "ثبت"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
