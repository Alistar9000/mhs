import React, { useState } from "react";
import { usePortfolios } from "../../hooks/usePortfolios";
import { FiEdit2, FiTrash2, FiToggleLeft, FiToggleRight } from "react-icons/fi";
import PortfolioMiniChart from "../charts/PortfolioMiniChart";
import EditPortfolioModal from "./EditPortfolioModal";
import { PortfoliosRowSkeleton } from "../ui/skeleton/PortfoliosRowSkeleton";
import { Link } from "react-router-dom";
import { slugify } from "../../utils/slugify";
import { useStore } from "../../store/store";
import moment from "moment-jalaali";
import { to_persian_date } from "../../utils/persianDate";

export default function PortfolioTable({
  portfolios = [],
  sortBy,
  isError,
  isLoading,
}) {
  const { deleteMut, enableMut, disableMut } = usePortfolios();
  const [openEdit, setOpenEdit] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const {setToast} = useStore();
  const [portfolioToEdit, setPortfolioToEdit] = useState(null);

  const handleOpenEdit = (portfolio) => {
    setPortfolioToEdit(portfolio);
    setOpenEdit(true);
  };

  const handleDeleteSubmit = (id) => {
    setDeleteItem(null);
    deleteMut.mutate(id, {
      onSuccess: () => {
       setToast({type:'success',text:'سبد با موفقیت حذف شد'})
      },
      onError: () => setToast({type:'error',text:'خطا در حذف سبد'}),
    });
  };

  // ✅ فعال/غیرفعال کردن سبد
  const toggleStatus = (portfolio) => {
    const fn = portfolio.is_active ? disableMut : enableMut;
    fn.mutate(portfolio.id, {
      onSuccess: () =>
        setToast({type:'success',text:
          `سبد "${portfolio.name}" ${
            portfolio.is_active ? "غیرفعال" : "فعال"
          } شد`
    }),
      onError: () => setToast({type:'error',text:'خطا در تغییر وضعیت سبد'}),
    });
  };

  return (
    <div className="overflow-x-auto scrollbar-hide w-full">
      <table className="min-w-full text-sm  text-right">
        <thead className="bg-gray-50  dark:bg-gray-800 text-gray-600 dark:text-gray-300">
          <tr className="">
            <th className="p-3">نام سبد</th>
            <th className="p-3">وضعیت</th>
            <th
              className="p-3"
              // onClick={() => handleSort("value")}
            >
              ارزش سبد
              {/* {sortBy === "value" && (order === "asc" ? "▲" : "▼")} */}
            </th>
            <th
              className="p-3"
              // onClick={() => handleSort("return_value")}
            >
              بازدهی (تومان){" "}
              {/* {sortBy === "return_value" && (order === "asc" ? "▲" : "▼")} */}
            </th>
            <th
              className="p-3"
              // onClick={() => handleSort("return_value_pct")}
            >
              بازدهی (%){" "}
              {/* {sortBy === "return_value_pct" && (order === "asc" ? "▲" : "▼")} */}
            </th>
            <th
              className="p-3"
              // onClick={() => handleSort("manager_share")}
            >
              سهم سبدگردان{" "}
              {/* {sortBy === "manager_share" && (order === "asc" ? "▲" : "▼")} */}
            </th>
            <th
              className="p-3"
              // onClick={() => handleSort("due_date")}
            >
              تاریخ سررسید{" "}
              {/* {sortBy === "due_date" && (order === "asc" ? "▲" : "▼")} */}
            </th>
            <th className="p-3 text-center">نمودار ۱ماهه</th>
            <th className="p-3 text-center">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td
                colSpan="9"
                className="p-4 space-y-3 rounded-2xl bg-white shadow-md animate-pulse"
              >
                {[...Array(3)].map((_, i) => (
                  <PortfoliosRowSkeleton key={i} />
                ))}
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td
                colSpan={"9"}
                className="text-center bg-white flex items-center justify-center relative rounded-2xl text-slate-500 shadow-md p-4"
              >
                <AlertTriangle className="absolute right-4 text-rose-400" />
                <span className="w-full text-center">
                  خطا در دریافت داده‌ها از سرور
                </span>
              </td>
            </tr>
          ) : portfolios?.length > 0 ? (
            portfolios?.map((portfolio) => (
              <tr
                key={portfolio?.id}
                className="border-b last:border-b-0 *:px-3 *:py-4  dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td className="font-medium min-w-32 cursor-pointer">
                  <Link
                    to={`/dashboard/portfolios/${portfolio?.id}/${slugify(
                      portfolio?.name
                    )}`}
                  >
                    {portfolio?.name}
                  </Link>
                </td>
                <td className="">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      portfolio?.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {portfolio?.is_active ? "فعال" : "غیرفعال"}
                  </span>
                </td>
                <td className="">
                  {portfolio?.metrics?.portfolio_value?.toLocaleString()}
                </td>
                <td dir="ltr" className="">
                  {portfolio?.metrics?.return_amount?.toLocaleString()}
                </td>
                <td dir="ltr" className={`${portfolio?.metrics?.return_amount > 0 ? "text-green-600" : "text-red-600" }`}>{portfolio.metrics?.return_percent}%</td>
                <td className="">
                  {portfolio?.is_active ? portfolio?.metrics?.manager_share?.toLocaleString() : 0}
                </td>
                <td>{portfolio?.financial?.due_date ? to_persian_date(portfolio?.financial?.due_date) : null}</td>
                <td className="h-10 min-w-20 place-items-center !p-0">
                  <PortfolioMiniChart data={portfolio?.value_histories} />
                </td>
                <td className="flex justify-between  gap-2 2xl:gap-0 items-center min-h-12">
                  <button
                    onClick={() => toggleStatus(portfolio)}
                    className="text-blue-600 bg-white hover:text-blue-800"
                  >
                    {portfolio?.is_active ? (
                      <FiToggleRight size={18} />
                    ) : (
                      <FiToggleLeft size={18} />
                    )}
                  </button>
                  <button
                    onClick={() => handleOpenEdit(portfolio)}
                    className="text-yellow-500 bg-white hover:text-yellow-700"
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setDeleteItem({ id: portfolio?.id, name: portfolio?.name });
                    }}
                    className="text-red-500 bg-white hover:text-red-700"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="9"
                className="p-6  text-center text-gray-400 dark:text-gray-500"
              >
                سبدی برای نمایش وجود ندارد
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <EditPortfolioModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        portfolio={portfolioToEdit}
      />
      {deleteItem && (
        <div
          onClick={() => setDeleteItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg p-5 shadow-lg text-sm"
          >
            <p>از حذف سبد "{deleteItem?.name}" مطمئن هستید؟</p>

            <div className="flex gap-2 mt-7 justify-end">
              <button
                onClick={() => setDeleteItem(null)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                خیر
              </button>
              <button
                onClick={() => handleDeleteSubmit(deleteItem?.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                بله
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
