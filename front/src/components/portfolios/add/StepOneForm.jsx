import { useForm } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import * as Yup from "yup";

const schema = Yup.object().shape({
  customer_name: Yup.string().required("نام مشتری ضروری است"),
  phone: Yup.string().required("شماره تلفن ضروری است"),
  national_id: Yup.string().required("کد ملی ضروری است"),
  initial_capital: Yup.number().typeError("عدد نامعتبر").required(),
  dividend_profit: Yup.number().typeError("عدد نامعتبر").required(),
  commission: Yup.number().typeError("عدد نامعتبر").required(),
  guarantee: Yup.number().typeError("عدد نامعتبر").required(),
});

export default function StepOneForm({ data, onChange, onNext }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: data,
  });

  const handleContractDate = (value) => {
    const due = addThreeMonths(value);

    setValue("contract_date", value);
    setValue("due_date", due);

    onChange({
      ...data,
      contract_date: value,
      due_date: due,
    });
  };

  const addThreeMonths = (date) => {
    if (!date) return null;
    let m = date.month + 3;
    let year = date.year;

    if (m > 12) {
      m -= 12;
      year += 1;
    }
    return { year, month: m, day: date.day };
  };

  const onSubmit = (values) => {
    onChange({ ...data, ...values });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      <div>
        <label>نام مشتری</label>
        <input {...register("customer_name")} className="input" />
        <p className="error">{errors.customer_name?.message}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>شماره تلفن</label>
          <input {...register("phone")} className="input" />
        </div>

        <div>
          <label>کد ملی</label>
          <input {...register("national_id")} className="input" />
        </div>
      </div>

      <div>
        <label>آدرس</label>
        <input {...register("address")} className="input" />
      </div>

      <div>
        <label>لینک کارگزاری</label>
        <input {...register("broker_link")} className="input" />
      </div>

      <div>
        <label>تاریخ عقد قرارداد</label>
        <DatePicker
          value={data.contract_date}
          onChange={handleContractDate}
          locale="fa"
          inputPlaceholder="انتخاب تاریخ"
          shouldHighlightWeekends
        />
      </div>

      <div>
        <label>تاریخ سررسید (اتوماتیک)</label>
        <input
          disabled
          value={
            data.due_date
              ? `${data.due_date.year}/${data.due_date.month}/${data.due_date.day}`
              : ""
          }
          className="input bg-gray-100"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>سرمایه اولیه</label>
          <input {...register("initial_capital")} className="input" />
        </div>

        <div>
          <label>سود سهام</label>
          <input {...register("dividend_profit")} className="input" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>کارمزد (%)</label>
          <input {...register("commission")} className="input" />
        </div>

        <div>
          <label>تضمین</label>
          <input {...register("guarantee")} className="input" />
        </div>
      </div>

      <button className="btn-primary w-full mt-4">مرحله بعد</button>
    </form>
  );
}
