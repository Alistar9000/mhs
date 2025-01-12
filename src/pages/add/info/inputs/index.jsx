import { useState } from "react";
import DatePicker, { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Icon from "react-multi-date-picker/components/icon";
import DateObject from "react-date-object";
import { useDispatch, useSelector } from "react-redux";
import { setFormEmptyCheck, setRepeatUser } from "../../../../redux/initialData";
const AddInfoInput = ({
  data,
  index,
  setFormData,
  formData,
  typee,
}) => {
  const rdata = useSelector((e) => e.data.value);
  const check = rdata.formemptycheck;
  const disable = rdata.floatingsearch;
  const nameEmpty = check[0].empty;
  const nameformat = check[0].digit;
  const initialEmpty = check[1].empty;
  const commisionEmpty = check[2].empty;
  const initialDigit = check[1].digit;
  const commisionDigit = check[2].digit;
  const dispatch = useDispatch();
 
  const { name, type, width, icon, outline, objectName, value } = data;
  // const [checkEmpty, setCheckEmpty] = useState(false);
  const [currentName, setCurrentName] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const evalue = e.target.value;
    name == "name" && dispatch(setFormEmptyCheck(["name", false, true]));
    name == "initial_money" &&
      dispatch(setFormEmptyCheck(["initial_money", false, true]));
    name == "commision" &&
      dispatch(setFormEmptyCheck(["commision", false, true]));
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="w-full grid  grid-rows-[30%_45%_25%] h-20    text-gray-600/90">
        <div className="flex place-items-center  gap-x-1 pr-2">
          {index !== 7 ? icon : data[0].icon}

          <label
            htmlFor=""
            className="byekan text-slate-500 font-semibold  text-[.75em] flex place-items-center "
          >
            {index!=7 ? name : data[0].name}{" "}
           
            <span className="px-1 text-[red]">{`${
              index == 0 || index == 4 || index == 6 ? "*" : ""
            }`}</span>
          </label>
        </div>
        {(index != 7 ) ? (
          <input
          
            type={type}
            value={value}
            onChange={handleChange}
            name={objectName}
            onFocus={()=>index == 0 && dispatch(setRepeatUser(false))}
            placeholder={index == 6 ? "%" : index == 4 ? "ریال" : ""}
            disabled={disable === '' && typee === 'edit'}
            className={`${width} placeholder:opacity-50 text-[.8em] border ${
              ((nameEmpty || !nameformat) && index == 0 && "border-rose-400") ||
              (index == 4 &&
                (initialEmpty || !initialDigit) &&
                "border-rose-400") ||
              (index == 6 &&
                (commisionEmpty || !commisionDigit) &&
                "border-rose-400")
            } py-1 text-gray-500 px-2 h-full  rounded-lg ${outline} `}
          />
        ) : (
          <div className="w-3/4 gap-x-2 flex justify-between place-items-center ">
            <DatePicker
            value={formData.certificate_date}
            disabled={disable === 0 && typee === 'edit'}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  certificate_date: `${e.year}/${e.month}/${e.day}`,
                });
              }}
              inputClass={`h-9 border rounded-lg w-2/3 px-2 text-[.8em]  ${outline}`}
              calendar={persian}
              locale={persian_fa}
            />
            <div className="grid grid-rows-[30%_45%_25%] h-24 w-1/3 pb-2">
              <label htmlFor="" className="byekan text-slate-500 gap-x-2 font-semibold text-[.75em] flex place-items-center"><span className="text-[1.2em]">{data[1].icon}</span> {data[1].name} </label>
              <select
              value={formData.garanty}
              name={data[1].objectName}
              disabled={disable === 0 && typee === 'edit'}
              onChange={(e)=>setFormData({
                ...formData,
                garanty: e.target.value,
              })}
              className={`border p-1 h-full rounded-lg byekan text-[.75em] ${outline} `}
            >
              <option>سفته</option>
              <option>سه ماه یکبار</option>
            </select>
            </div>
            
          </div>
        )}

        {index == 0 ? (
          <span className="text-[.65em] italic  text-gray-500 pr-2 pt-1">
            <ul className="flex gap-x-1">
              <li>حروف فارسی یا انگلیسی -</li>
              <li>کاراکترهای مجاز : _ - ( ) [ ] number</li>
            </ul>
          </span>
        ) : (
          (index == 4 || index == 6) && (
            <span className="text-[.65em] italic text-gray-500 pr-2 pt-1">
              اعداد numbers
            </span>
          )
        )}
      </div>
    </>
  );
};

export default AddInfoInput;
