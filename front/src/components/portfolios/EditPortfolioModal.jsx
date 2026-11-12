// src/components/portfolios/EditPortfolioModal.jsx
import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { X, Save, ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { usePortfolios } from "../../hooks/usePortfolios";
import { validateSymbol, fetchSymbols } from "../../api/symbols";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { useStore } from "../../store/store";
import { convertPersianNumbersToEnglish } from "../../utils/PersiantoEnglishDigit";
import api from "../../api/axios";

/**
 * Props:
 * - open (bool)
 * - onClose (fn)
 * - portfolio (object) -- the portfolio to edit
 */
export default function EditPortfolioModal({ open, onClose, portfolio }) {
  const { updateMut } = usePortfolios();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { toast, type, text, setToast } = useStore();
  const [symbolsOptions, setSymbolsOptions] = useState([]);
  const [firstStepLoading, setFirstStepLoading] = useState(false);
  const [showBottomError, setShowBottomError] = useState(false);
  const errorCount = useRef(0);

  const {
    control,
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    getValues,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // fields per your request
      name: "",
      phone: "",
      national_code: "",
      address: "",
      broker_link: "",
      commission_pct: "",
      guarantee_type: "promissory",
      contract_date: null, // Date object from datepicker
      initial_capital: "",
      dividend: "",
      withdrawals: "",
      broker_username: "",
      broker_password: "",
      holdings: [{ symbol: "", quantity: "" }],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "holdings",
  });

  // load mock or real symbols list (for auto-complete or validation suggestions)
  useEffect(() => {
    let mounted = true;
    fetchSymbols().then((list) => {
      if (!mounted) return;
      // normalize to array of codes
      const codes = Array.isArray(list)
        ? list.map((i) => (typeof i === "string" ? i : i.code))
        : [];
      setSymbolsOptions(codes);
    });
    return () => (mounted = false);
  }, []);

  // populate form when opening or portfolio changes
  useEffect(() => {
    if (!portfolio) return;
    // map holdings from portfolio.holdings (depends on api shape)
    const holdings = (portfolio.holdings || []).map((h) => ({
      symbol: h.symbol.name || "",
      quantity: String(h.quantity || ""),
    }));
    reset({
      name: portfolio.name ?? "",
      phone: portfolio.phone ?? "",
      national_code: portfolio.national_code ?? "",
      address: portfolio.address ?? "",
      broker_link: portfolio.broker_link ?? "",
      broker_username: portfolio.broker_username ?? "",
      broker_password: portfolio.broker_password ?? "",
      commission_pct: Math.round(portfolio.financial?.commission_pct) ?? "",
      guarantee_type: portfolio.financial?.guarantee_type ?? "promissory",
      contract_date: portfolio.financial?.contract_date
        ? new Date(portfolio.financial.contract_date)
        : null,
      initial_capital: portfolio.financial?.initial_capital ?? "",
      dividend: portfolio.financial?.dividend ?? 0,
      withdrawals: portfolio.financial?.withdrawals ?? 0,
      holdings: holdings.length ? holdings : [{ symbol: "", quantity: "" }],
    });
    setStep(1);
  }, [portfolio, reset]);

  useEffect(() => {
    if (!open) {
      // reset on close
      setTimeout(() => {
        reset();
        setStep(1);
      }, 200);
    }
  }, [open, reset]);

  if (!open) return null;

  // compute due_date (if quarterly)
  const computeDueDate = (contractDate, guaranteeType) => {
    if (!contractDate) return null;
    const dt = new Date(contractDate);
    if (guaranteeType === "quarterly") {
      const newDt = new Date(dt);
      newDt.setMonth(newDt.getMonth() + 3);
      return newDt.toISOString().substring(0, 10); // YYYY-MM-DD
    }
    return null;
  };

  const onNext = async () => {
    const valid_name = await trigger("name");
    const valid_national_code = await trigger("national_code");
    const valid_fee = await trigger("commission_pct");
    const valid_initial = await trigger("initial_capital");
    const valid_date = getValues("contract_date");

    if (!valid_name) {
      errorCount.current += 1;
      setError("name", { type: "required", message: "نام لازم است" });
      return;
    }
    if (!valid_national_code) {
      errorCount.current += 1;
      setError("national_code", {
        type: "required",
        message: "شماره ملی لازم است",
      });
      return;
    }

    if (portfolio.national_code !== getValues("national_code")) {
      setFirstStepLoading(true);
      const response = await api.post(
        `/api/portfolios/national_code/${getValues("national_code")}`,
      );
      setFirstStepLoading(false);
      if (response.data) {
        errorCount.current += 1;
        setError("national_code", {
          type: "required",
          message: "شماره ملی تکراری است",
        });
        return;
      }
    }

    if (!valid_fee) {
      errorCount.current += 1;
      setError("commission_pct", {
        type: "required",
        message: "کارمزد لازم است",
      });

      return;
    }

    if (!valid_date) {
      errorCount.current += 1;
      setError("contract_date", {
        type: "manual",
        message: "تاریخ قرارداد لازم است",
      });
      return;
    }

    clearErrors("contract_date");

    if (!valid_initial) {
      errorCount.current += 1;
      setError("initial_capital", {
        type: "required",
        message: "سرمایه اولیه لازم است یا فرمت نادرست است",
      });
      return;
    }

    errorCount.current = 0;

    setStep(2);
  };

  const onBack = () => setStep((s) => Math.max(1, s - 1));

  const onSubmit = async (values) => {
    // before submit, validate each holding symbol exists in symbols table via API
    setLoading(true);
    const invalids = [];
    for (let i = 0; i < values.holdings.length; i++) {
      const sym = (values.holdings[i].symbol || "").trim();
      if (!sym) {
        setError(`holdings.${i}.symbol`, {
          type: "required",
          message: "نماد وارد نشده",
        });
        invalids.push(i);
        continue;
      }
      // check API
      const exists = await validateSymbol(sym);
      if (!exists) {
        setError(`holdings.${i}.symbol`, {
          type: "validate",
          message: ` نماد${sym} معتبر نیست `,
        });
        invalids.push(i);
      } else {
        clearErrors(`holdings.${i}.symbol`);
      }
      // quantity check
      const q = Number(values.holdings[i].quantity);
      if (!Number.isFinite(q) || q <= 0) {
        setError(`holdings.${i}.quantity`, {
          type: "validate",
          message: "تعداد نامعتبر",
        });
        invalids.push(i);
      } else {
        clearErrors(`holdings.${i}.quantity`);
      }
    }

    if (invalids.length > 0) {
      toast.error("لطفا خطاهای پرتفو را اصلاح کنید.");
      return;
    }

    // prepare payload according to backend expectation
    const payload = {
      name: values.name,
      national_code: convertPersianNumbersToEnglish(values.national_code),
      phone: convertPersianNumbersToEnglish(values.phone),
      address: values.address,
      broker_link: values.broker_link,
      broker_username: convertPersianNumbersToEnglish(values.broker_username),
      broker_password: convertPersianNumbersToEnglish(values.broker_password),
      initial_capital:
        Number(convertPersianNumbersToEnglish(values.initial_capital)) || 0,
      commission_pct:
        Number(convertPersianNumbersToEnglish(values.commission_pct)) || 0,
      contract_date: values.contract_date
        ? new Date(values.contract_date).toISOString().substring(0, 10)
        : null,
      guarantee_type: values.guarantee_type,
      dividend: Number(convertPersianNumbersToEnglish(values.dividend)) || 0,
      withdrawals:
        Number(convertPersianNumbersToEnglish(values.withdrawals)) || 0,
      // holdings as [{ symbol: 'FOLAD', quantity: 100 }, ...]
      holdings: values.holdings.map((h) => ({
        symbol: h.symbol.trim(),
        quantity: Number(convertPersianNumbersToEnglish(h.quantity)) || 0,
      })),
    };

    // compute due date for quarterly on backend ideally; we can optionally include due_date
    // if (payload.guarantee_type === "quarterly" && payload.contract_date) {
    //   const dt = new Date(payload.contract_date);
    //   dt.setMonth(dt.getMonth() + 3);
    //   payload.due_date = dt.toISOString().substring(0,10);
    // }

    try {
      await updateMut.mutateAsync({ id: portfolio.id, payload });
      setToast({ type: "success", text: "تغییرات ثبت سبد شد" });
      onClose();
      errorCount.current = 0;
      setLoading(false);
    } catch (err) {
      console.error(err);
      setToast({ type: "error", text: "خطا در ثبت تغییرات" });
    }
  };

  // watch holdings to allow add/remove UI logic
  const holdingsWatch = watch("holdings");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => {
          onClose();
          errorCount.current = 0;
        }}
      />

      <div className="relative z-10 w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 mx-4">
        {/* header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">ویرایش سبد</h3>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="overflow-auto sm:px-2  h-[60vh] "
        >
          {/* Step indicator */}
          <div className="flex  items-center gap-2 mb-4">
            <div
              className={`px-3 py-1 rounded ${
                step === 1 ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
            >
              اطلاعات کلی
            </div>
            <div
              className={`px-3 py-1 rounded ${
                step === 2 ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
            >
              پرتفو
            </div>
          </div>

          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-xs text-gray-600">نام مشتری</span>
                <input
                  {...register("name", { required: true })}
                  className="mt-1 p-2 border rounded"
                />
                {errors?.name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors?.name.message || "نام لازم است"}
                  </p>
                )}
              </label>

              <label className="flex flex-col">
                <span className="text-xs text-gray-600">شماره تلفن</span>
                <input
                  {...register("phone")}
                  className="mt-1 p-2 border rounded"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-xs text-gray-600">شماره ملی</span>
                <input
                  {...register("national_code", { required: true })}
                  className="mt-1 p-2 border rounded"
                />
                {errors?.national_code && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors?.national_code.message || "شماره ملی لازم است"}
                  </p>
                )}
              </label>

              <label className="flex flex-col">
                <span className="text-xs text-gray-600">آدرس</span>
                <input
                  {...register("address")}
                  className="mt-1 p-2 border rounded"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-xs text-gray-600">لینک کارگزاری</span>
                <input
                  {...register("broker_link")}
                  className="mt-1 p-2 border rounded"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-xs text-gray-600">
                  کارمزد سبدگردان (%)
                </span>
                <input
                  type="number"
                  step="0.01"
                  {...register("commission_pct")}
                  className="mt-1 p-2 border rounded"
                />
                {errors?.commission_pct && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.commission_pct.message}
                  </p>
                )}
              </label>

              <label className="flex flex-col">
                <span className="text-xs text-gray-600">نوع تضمین</span>
                <select
                  {...register("guarantee_type")}
                  className="mt-1 p-2 border rounded"
                >
                  <option value="promissory">سفته</option>
                  <option value="quarterly">یک ماهه</option>
                </select>
              </label>

              <label className="flex flex-col">
                <span className="text-xs text-gray-600">تاریخ عقد قرارداد</span>
                <Controller
                  control={control}
                  name="contract_date"
                  render={({ field }) => (
                    <>
                      <DatePicker
                        calendar={persian}
                        locale={persian_fa}
                        value={field.value}
                        onChange={(val) =>
                          field.onChange(val ? val.toDate() : null)
                        }
                        inputClass="mt-1 p-2 border rounded w-full"
                        format="YYYY/MM/DD"
                        calendarPosition="bottom-left"
                      />
                      {errors?.contract_date && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.contract_date.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </label>

              <label className="flex flex-col">
                <span className="text-xs text-gray-600">
                  سرمایه اولیه (تومان)
                </span>
                <input
                  type="number"
                  {...register("initial_capital")}
                  className="mt-1 p-2 border rounded"
                />
                {errors?.initial_capital?.message && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors?.initial_capital.message || "سرمایه اولیه لازم است"}
                  </p>
                )}
              </label>

              <label className="flex flex-col">
                <span className="text-xs text-gray-600">سود سهام (تومان)</span>
                <input
                  type="number"
                  {...register("dividend")}
                  className="mt-1 p-2 border rounded"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-xs text-gray-600">برداشت (تومان)</span>
                <input
                  type="number"
                  {...register("withdrawals")}
                  className="mt-1 p-2 border rounded"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-xs text-gray-600">
                  نام کاربری کارگزای
                </span>
                <input
                  {...register("broker_username")}
                  className="mt-1 p-2 border rounded"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-xs text-gray-600">رمز عبور کارگزاری</span>
                <input
                  {...register("broker_password")}
                  className="mt-1 p-2 border rounded"
                />
              </label>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-sm font-medium">پرتفو</h4>
                <button
                  type="button"
                  onClick={() => append({ symbol: "", quantity: "" })}
                  className="inline-flex sm:ml-4 items-center gap-2 px-3 py-1 bg-green-600 text-white rounded"
                >
                  <Plus className="w-4 h-4" />
                  افزودن سهم
                </button>
              </div>

              <div className="space-y-2">
                {fields.map((field, idx) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-12 h-15 gap-2 items-start"
                  >
                    <div className="col-span-6">
                      <input
                        {...register(`holdings.${idx}.symbol`, {
                          required: true,
                        })}
                        placeholder="نماد (مثلاً فولاد)"
                        className="w-full p-2 border rounded"
                      />
                      {errors?.holdings?.[idx]?.symbol && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.holdings[idx].symbol.message ||
                            "نماد لازم است"}
                        </p>
                      )}
                    </div>

                    <div className="col-span-4">
                      <input
                        {...register(`holdings.${idx}.quantity`, {
                          required: true,
                        })}
                        type="number"
                        placeholder="تعداد"
                        className="w-full p-2 border rounded"
                      />
                      {errors?.holdings?.[idx]?.quantity && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.holdings[idx].quantity.message ||
                            "تعداد نامعتبر"}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2 pt-1 flex gap-2">
                      <button
                        type="button"
                        onClick={() => remove(idx)}
                        className="p-2 bg-red-100 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* footer */}
          <div className="flex items-center justify-end gap-3 mt-6">
            <div className="flex items-center gap-2">
              {step < 2 ? (
                <div className="flex items-center gap-3">
                  {errorCount.current !== 0 && (
                    <p className="text-xs text-red-600">
                      خطاهای رخ داده را اصلاح نمایید
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={onNext}
                    className="px-4 py-2 ml-4 flex items-center gap-2 rounded bg-blue-600 text-white"
                  >
                    {firstStepLoading && (
                      <div className="rounded-full animate-spin border-blue-600 aspect-square border-2 border-t-white border-r-white w-3"></div>
                    )}
                    مرحله بعد <ChevronLeft className="inline-block w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={onBack}
                    className="px-4 py-2 rounded bg-gray-100"
                  >
                    قبلی
                  </button>
                  <button
                    type="submit"
                    className="px-4 sm:ml-4 py-2 rounded bg-green-600 text-white inline-flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> ثبت تغییرات
                    {loading && (
                      <span className="h-4 w-4 border-2 border-t-white rounded-full border-r-white border-green-600 animate-spin"></span>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
