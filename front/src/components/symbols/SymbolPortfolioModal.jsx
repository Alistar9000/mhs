import { useEffect, useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import { useSymbolPortfolio } from "../../hooks/useSymbol";
import { CircleOff, CircleX, XCircle, XCircleIcon } from "lucide-react";
import { slugify } from "../../utils/slugify";

export default function SymbolPortfolioModal({ selected, setSelected }) {
  
  // if(!selected) return

  const { data = [], isLoading, isError } = useSymbolPortfolio(selected?.code);
  const [isOpen,setIsOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div
      onClick={() =>setSelected(null)}
      className={`fixed inset-0 flex justify-end z-20  transform transition-opacity duration-300 ${selected ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full md:w-[420px] bg-white h-full shadow-2xl p-6 overflow-y-auto transform  transition-transform duration-300 ${selected ? "-translate-x-0" : "-translate-x-full"}`}
      >
        <CircleX
          onClick={() => setSelected(null)}
          className="text-gray-400 mb-2 my-5 cursor-pointer"
        />

        <h3 className="font-semibold flex gap-2 text-lg mb-4">
          <span>سبدهای دارای</span>
          <span className="text-blue-400">{selected?.name}</span>
        </h3>
        <div className="flex flex-col items-center">

        
       { selected && isLoading ? <div className=" h-6 w-6 rounded-full border-2  border-gray-600 border-t-white border-r-white animate-spin"></div> : isError ? <p>خطا در دریافت لیست سبدها</p> : <table className="w-full">
          <thead >
            <tr className="border-b *:text-start *:text-gray-400">
              <th>نام</th>
              <th>تعداد</th>
            </tr>
          </thead>
          <tbody>
            {data?.sort((a,b) => b.quantity -  a.quantity).map((p, idx) => (
                <tr
                  key={idx}
              
                  className="*:text-start *:text-sm *:py-2 cursor-pointer hover:bg-gray-100"
                >
                  <td>
                    <Link className="w-full" target="_blank" to={`/dashboard/portfolios/${p?.id}/${slugify(p?.name)}`}>
                    {p?.name}
                    </Link>
                    </td>
                  <td className="">
                    <Link className="w-full" target="_blank" to={`/dashboard/portfolios/${p?.id}/${slugify(p?.name)}`}>
                    {p?.quantity.toLocaleString()}
                    </Link>
                    </td>
                </tr>
              ))}
          </tbody>
        </table>
}
</div>
      </div>

    </div>
  );
}
