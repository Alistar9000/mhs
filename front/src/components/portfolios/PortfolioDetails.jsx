import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { fetchPortfolio } from "../../api/portfolios";
import PortfolioFullChart from "../charts/PortfolioFullChart";
import PortfolioPieChart from "../charts/PortfolioPieChart";
import PortfolioDetailSkeleton from "../ui/skeleton/PortfolioDetailSkeleton";
import {
  Edit,
  Eye,
  EyeClosed,
  EyeOff,
  Home,
  Notebook,
  NotebookText,
  Plus,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { queryClient } from "../../main";
import { useCrumbs } from "../../store/store";
import moment from "moment-timezone";
import EditPortfolioModal from "./EditPortfolioModal";
import api from "../../api/axios";
const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

export const portfolioLoader = async ({ params }) => {
  return queryClient.ensureQueryData({
    queryKey: ["portfolio-detail", params.id],
    queryFn: () => fetchPortfolio(params.id),
  });
};
export default function PortfolioDetails() {
  const { id } = useParams();
  const { setCrumbs } = useCrumbs();
  const [showPassword, setShowPassword] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openNoteDiv, setOpenNoteDiv] = useState(false);
  const [noteDiv, setNoteDiv] = useState(false);
  const [noteInput, setNoteInput] = useState("");
  const [noteResult, setNoteResult] = useState(false);
  const timeoutRef = useRef(null);
  const {
    data: portfolio,
    isFetching,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["portfolio-detail", id],
    queryFn: () => fetchPortfolio(id),
    refetchInterval: () => {
      const now = moment().tz("Asia/Tehran");
      const hours = now.hours();
      const minutes = now.minutes();
      if (hours >= 9 && hours <= 12 && minutes <= 30) {
        return 60000;
      }
      return false;
    },
  });

  useEffect(() => {
    if (!portfolio) return;
    setNoteInput(portfolio.note);
  }, [portfolio]);

  // محاسبه ارزش هر سهم و درصد تغییر قیمت
  const portfolioWithValue =
    portfolio?.holdings?.map((h) => ({
      ...h,
      value: Math.round(h.quantity * (h.symbol.last_price / 10)),
      last_price: h.symbol.last_price,
      last_price_pct: h.symbol.last_price_pct,
    })) || [];

  useEffect(() => {
    if (!portfolio) return;
    document.title = portfolio.name;
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
        path: "/dashboard/portfolios",
        label: "سبدها",
      },
      {
        path: `/dashboard/portfolios/${portfolio.id}`,
        label: portfolio.name,
      },
    ]);
  }, [portfolio]);

  const handleNoteChange = (e) => {
    const value = e.target.value;
    setNoteInput(value);
  };

  const handleNoteSubmit = async (e) => {
    e.preventDefault();

    const response = await api.post(`/api/portfolios/${portfolio.id}/note`, {
      note: noteInput,
    });
    const result = response.data.success;
    if (!result) setNoteResult(true);
    else setNoteDiv(false);
  };

  if (isLoading) return <PortfolioDetailSkeleton />;
  if (isError)
    return (
      <div className="h-screen flex justify-center items-start">
        سبد مورد نظر یافت نشد!
      </div>
    );

  return (
    <div className="sm:p-8  bg-gray-50 min-h-screen space-y-4">
      {/* ===== Header + KPI ===== */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col gap-2">
          <div>
            <div className="flex justify-between w-full items-center">
              <h1 className="text-2xl w-max flex  items-center gap-2 font-bold text-gray-800">
                {portfolio?.name}
              </h1>
              <div className="flex items-center gap-2">
                <Edit
                  onClick={() => setOpenEdit(true)}
                  className="text-amber-400 cursor-pointer"
                  size={16}
                />
                <NotebookText
                  onClick={() => setOpenNoteDiv((e) => !e)}
                  size={16}
                  className="text-cyan-400 cursor-pointer"
                />
              </div>
            </div>

            <EditPortfolioModal
              open={openEdit}
              onClose={() => setOpenEdit(false)}
              portfolio={portfolio}
            />
            <p className="text-sm mt-1">
              وضعیت:
              <span
                className={`mr-2 px-3 py-1 rounded-full text-xs font-medium ${
                  portfolio?.is_active
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {portfolio?.is_active ? "فعال" : "غیرفعال"}
              </span>
            </p>
          </div>
          <div
            className={`flex flex-col gap-2 overflow-auto rounded-xl scrollbar-hide ${openNoteDiv ? "opacity-100 border p-4 my-2 h-[40vh] sm:h-52" : "h-0 p-0 opacity-0 border-none m-0 pointer-events-none"} transition-all duration-300`}
          >
            <p
              onClick={() => setNoteDiv((e) => !e)}
              className="text-cyan-400 w-max text-sm cursor-pointer"
            >
              یادداشت
              <Plus size={18} className="cursor-pointer inline-block mr-1" />
            </p>
            {noteDiv ? (
              <form
                onSubmit={handleNoteSubmit}
                className={`flex h-full w-full flex-col gap-2 mb-3 rounded-xl border p-4`}
              >
                <textarea
                  onChange={handleNoteChange}
                  value={noteInput}
                  name="note"
                  placeholder="متن خود را وارد کنید..."
                  className="w-full resize-none text-sm placeholder:text-neutral-300 placeholder:text-sm outline-none h-full"
                ></textarea>
                <div className="flex items-center gap-2 justify-end">
                  {noteResult && (
                    <p className="text-red-500 text-sm">خطا در ثبت یادداشت</p>
                  )}
                  <button
                    type="submit"
                    className="border hover:bg-green-100 w-max rounded-md bg-white text-sm px-2 py-0.5 border-green-500 text-green-500"
                  >
                    ذخیره
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNoteDiv(false);
                      setNoteInput(portfolio?.note);
                    }}
                    className="text-red-500 border border-red-500 rounded-md bg-white hover:bg-red-100 px-2 py-0.5 text-sm"
                  >
                    لغو
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex-1">
                <p className=" text-slate-500 text-sm break-words whitespace-pre-wrap">
                  {noteInput}
                </p>
              </div>
            )}
          </div>
          <div className="flex-col flex sm:flex-row sm:items-center *:flex-1 w-full  gap-5 sm:gap-20">
            <div>
              <p className="text-xs text-gray-500 mb-1">سرمایه اولیه</p>

              <span className="text-sm rounded-xl py-1 px-2  font-bold">
                {portfolio?.financial?.initial_capital.toLocaleString()}
                <span className="text-sm px-1">تومان</span>
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">ارزش</p>

              <span className="text-sm rounded-xl py-1 px-2  font-bold">
                {portfolio?.metrics?.portfolio_value.toLocaleString()}
                <span className="text-sm px-1">تومان</span>
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">بازدهی</p>
              <div className="flex items-center gap-2">
                <span
                  dir="ltr"
                  className={`text-sm rounded-xl py-1 px-2  font-bold ${
                    portfolio?.metrics?.return_amount >= 0
                      ? "text-green-600 bg-green-100"
                      : "text-red-600 bg-red-100"
                  }`}
                >
                  {`${portfolio?.metrics?.return_percent}%`}
                </span>
                <div className="flex gap-1 items-center">
                  <span
                    dir="ltr"
                    className={`text-lg font-bold ${
                      portfolio?.metrics?.return_amount >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {portfolio?.metrics?.return_amount.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-400 px-1">تومان</span>
                </div>

                {+portfolio?.value_histories[0]?.return_ >=
                +portfolio?.value_histories[1]?.return_ ? (
                  <AiOutlineArrowUp className="text-green-500 text-xl" />
                ) : (
                  <AiOutlineArrowDown className="text-red-500 text-xl" />
                )}
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">سهم سبدگردان</p>
              <p className="text-base font-semibold text-gray-700">
                {portfolio?.is_active
                  ? portfolio?.metrics?.manager_share.toLocaleString()
                  : 0}
                <span className="text-xs text-gray-400 px-1">تومان</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ===== Portfolio Table ===== */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 pt-0">
        <h3 className="font-semibold text-gray-800 mb-4  w-full py-3 z-30 bg-white">
          پرتفوی سبد
        </h3>

        <div className="grid md:grid-cols-3 gap-2 sm:gap-0">
          <div
            dir="ltr"
            className="sm:col-span-2 overflow-auto scrollbar-x-hide max-h-60 sm:max-h-52 px-2 sm:pl-6"
          >
            <table dir="rtl" className="w-full scrollbar-hide text-sm">
              <thead>
                <tr className="text-gray-500 *:text-start sm:*:text-center border-b">
                  <th className="py-3">نماد</th>
                  <th>تعداد</th>
                  <th>قیمت</th>
                  <th>ارزش(تومان)</th>
                </tr>
              </thead>

              <tbody>
                {portfolioWithValue
                  ?.sort((a, b) => b.value - a.value)
                  .map((h, idx) => (
                    <tr
                      key={idx}
                      className="border-b *:text-start *:sm:text-center last:border-none hover:bg-gray-50 transition"
                    >
                      <td className="py-3 min-w-24 sm:min-w-0 !text-start sm:!text-center  font-medium text-gray-700">
                        {h.symbol.name}
                      </td>

                      <td className="min-w-24 sm:min-w-0">
                        {Number(h.quantity).toLocaleString()}
                      </td>

                      <td className="font-semibold min-w-32 sm:min-w-0">
                        <span
                          className={`px-1 ${
                            h.last_price_pct >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          ({Math.abs(h.last_price_pct)}%)
                        </span>
                        {h.last_price}
                      </td>

                      <td className="font-medium min-w-32 sm:min-w-0">
                        {h.value.toLocaleString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="sm:col-span-1 w-full ">
            <PortfolioPieChart portfolioWithValue={portfolioWithValue} />
          </div>
        </div>
      </div>

      {/* ===== Chart ===== */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 p-6">نمودار ارزش سبد</h3>

        <PortfolioFullChart id={portfolio?.id} />
      </div>
      {/* ===== Financial + Personal Cards ===== */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Financial */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h3 className="font-semibold text-gray-800 border-b pb-2">
            اطلاعات مالی
            <span className="text-xs text-neutral-400 px-2">(تومان)</span>
          </h3>

          <div className="grid grid-cols-2 gap-4 text-sm">
            {/* <div>
              <p className="text-gray-400">سرمایه اولیه</p>
              <p className="font-medium">
                {portfolio?.financial?.initial_capital.toLocaleString()}
              </p>
            </div> */}
            <div>
              <p className="text-gray-400">کارمزد</p>
              <p className="font-medium">
                {Math.round(portfolio?.financial?.commission_pct)}%
              </p>
            </div>

            <div>
              <p className="text-gray-400">سود سهام</p>
              <p className="font-medium">
                {portfolio?.financial?.dividend.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-gray-400">برداشت</p>
              <p className="font-medium">
                {portfolio?.financial?.withdrawals.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-gray-400">تاریخ عقد قرارداد</p>
              <p className="font-medium">
                {new Date(
                  portfolio?.financial?.contract_date,
                ).toLocaleDateString("fa-IR")}
              </p>
            </div>

            <div>
              <p className="text-gray-400">تاریخ سررسید</p>
              <p className="font-medium">
                {new Date(portfolio?.financial?.due_date).toLocaleDateString(
                  "fa-IR",
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Personal */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h3 className="font-semibold text-gray-800 border-b pb-2">
            اطلاعات فردی
          </h3>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">شماره ملی</p>
              <p className="font-medium">{portfolio?.national_code}</p>
            </div>

            <div>
              <p className="text-gray-400">موبایل</p>
              <p className="font-medium">{portfolio?.phone}</p>
            </div>

            <div className="col-span-2">
              <p className="text-gray-400">آدرس</p>
              <p className="font-medium">{portfolio?.address}</p>
            </div>

            <div className="col-span-2">
              <p className="text-gray-400">لینک کارگزاری</p>
              <a
                target="_blank"
                href={portfolio?.broker_link}
                className="text-blue-600 hover:underline break-all"
              >
                {portfolio?.broker_link}
              </a>
            </div>

            <div>
              <p className="text-gray-400">نام کاربری</p>

              <input
                disabled
                className="bg-transparent"
                type={!showPassword && "password"}
                defaultValue={portfolio?.broker_username}
              />
            </div>

            <div>
              <p className="text-gray-400">رمز عبور</p>
              <div className="flex gap-4">
                <input
                  disabled
                  className="bg-transparent"
                  type={!showPassword && "password"}
                  defaultValue={portfolio?.broker_password}
                />

                {showPassword ? (
                  <Eye
                    size={16}
                    className="cursor-pointer text-gray-600"
                    onClick={() => setShowPassword((e) => !e)}
                  />
                ) : (
                  <EyeOff
                    size={16}
                    className="cursor-pointer text-gray-600"
                    onClick={() => setShowPassword((e) => !e)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
