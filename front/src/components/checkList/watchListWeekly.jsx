import { useEffect, useState } from "react";
import { useCrumbs } from "../../store/store";
import { ArrowUp, ArrowUpWideNarrow, Check, ChevronDown, ChevronsUpDown, ChevronUp, ChevronUpSquare, Edit, Home, Plus, Trash, X } from "lucide-react";
import { useWatchList } from "../../hooks/useWatchList";
import SymbolSkeleton from "../ui/skeleton/SymbolsSkeleton";
import { PortfoliosRowSkeleton } from "../ui/skeleton/PortfoliosRowSkeleton";
import WatchListModal from "./watchlistmodal";
import { convertPersianNumbersToEnglish } from "../../utils/PersiantoEnglishDigit";
import WatchListModalWeekly from "./watchlistmodalWeekly";

export default function WatchListWeekly() {
  const { setCrumbs } = useCrumbs();
  const { data, isLoading, deleteMut, updateMut } = useWatchList('weekly');
  const [showModal, setShowModal] = useState(false);
  const [editFlag, setEditFlag] = useState(null);
  const [editPayload, setEditPayload] = useState([]);
  const [sortState, setSortState] = useState({direction:'desc'});
  
  useEffect(() => {
    if(!data) return

    setEditPayload(data.sort((a,b)=>b.target1_dis[0] - a.target1_dis[0]))

  }, [data])
  
  useEffect(() => {
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
        path: "/dashboard/watch_list_weekly",
        label: "واچ لیست هفتگی",
      },
    ]);
  }, []);
 
  const handleChange = (i,id) => {
    setEditPayload(e=> e.map(x=> x.id === id ? {...x,[i.target.name]:+convertPersianNumbersToEnglish(i.target.value)}:x))
  };
  const handleUpdate = (item) => {
   editPayload.map(e => e.id === item.id ? updateMut.mutate([e.symbol_code,'weekly',{'target1':e.target1,'target2':e.target2}]):e)
  //  setEditFlag((e) => e.filter(i => i !== item.id));
  setEditFlag(null)
  };

  const handleSort = (key) => {
       let direction
        sortState.direction === 'desc' ? direction = 'asc':  direction='desc' 
        setEditPayload(e=>e.sort((a,b) => 
         {

           if(key === 'target1'){
             if(direction === 'asc')
              return a.target1_dis[0] - b.target1_dis[0]
            else 
              return b.target1_dis[0] - a.target1_dis[0]
          }else{
             if(direction === 'asc')
             return a.target2_dis[0] - b.target2_dis[0]
            else 
              return b.target2_dis[0] - a.target2_dis[0]
          }
        }))
          setSortState({direction:direction})
        
       
  }

  return (
    <div className="rounded-xl p-6 bg-white h-full flex flex-col gap-5 overflow-hidden  shadow">
      <WatchListModalWeekly showModal={showModal} setShowModal={setShowModal} />

      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold text-2xl">واچ لیست هفتگی</p>
        </div>
        <div>
          <button
            onClick={() => setShowModal((e) => !e)}
            className="py-1 px-4 flex items-center gap-1 rounded-md bg-green-500 focus:bg-green-600 text-white text-sm"
          >
            <Plus size={15} className="text-white" />
            افزودن نماد
          </button>
        </div>
      </div>
      {
        // isLoading ?
        // <PortfoliosRowSkeleton />
        // :
        <div className=" overflow-x-auto scrollbar-x-hide">
          <table className="w-full">
           <thead className="text-slate-400 w-full text-sm bg-slate-50">
              <tr className="*:p-2">
                <th>نماد</th>
                <th>آخرین قیمت</th>
                <th>تارگت اول</th>
                <th>درصد</th>
                <th>
                  <span className="flex gap-2 items-center justify-center">

                  فاصله
                
                  <ChevronsUpDown size={14} onClick={() => handleSort('target1')} />
                 
                  </span>
                  
                 
                </th>
                <th>تارگت دوم</th>
                <th>درصد</th>
                <th>
                   <span className="flex gap-2 items-center justify-center">

                  فاصله
                
                  <ChevronsUpDown size={14} onClick={() => handleSort('target2')} />
                 
                  </span>

                </th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {editPayload?.map((item) => (
                <tr key={item.symbol} className="*:text-center border-b last:border-0 *:min-w-32 sm:*:min-w-0 *:py-2">
                  <td className="w-32">{item?.symbol}</td>

                  <td dir="ltr">
                    <div className="flex w-full justify-center gap-1 items-center">
                      <span
                        className={`${item?.price_percent >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                        {`  (${item?.price_percent})`}
                      </span>
                        <span>{item?.price}</span>
                    </div>
                  </td>
                  {editFlag !== item?.id ? (
                    <>
                      <td>{item?.target1}</td>
                      <td>{item?.target1_dis[1]}%</td>
                      <td className="">
                        <span dir="ltr" className="text-white py-1 px-2 rounded-md bg-green-400">

                        {item?.target1_dis[0]}x
                        </span>
                        </td>
                      <td>{item?.target2}</td>
                      <td>{item?.target2_dis[1]}%</td>
                      <td className="text-green-500 text-[1.1em]">
                        <span dir="ltr" className="text-white py-1 px-2 rounded-md bg-fuchsia-400">

                        {item?.target2_dis[0]}x
                        
                        </span>
                        </td>
                    </>
                  ) : (
                    <>
                      <td>
                        <input
                          onChange={e=>handleChange(e,item?.id)}
                          name="target1"
                          className="rounded-md w-1/3 outline-none px-2 ring-1"
                          type="number"
                          value={item?.target1}
                        />
                      </td>
                       <td>{item?.target1_dis[1]}%</td>
                      <td> <span dir="ltr" className="text-white py-1 px-2 rounded-md bg-green-400">

                        {item?.target1_dis[0]}x
                        </span></td>
                      <td>

                      <input
                        onChange={e=>handleChange(e,item?.id)}
                        name="target2"
                        className="rounded-md w-1/3 outline-none px-2 ring-1"
                        type="number"
                        value={item?.target2}
                        />
                        </td>
                      <td>{item?.target2_dis[1]}%</td>
                       <td><span dir="ltr" className="text-white py-1 px-2 rounded-md bg-fuchsia-400">

                        {item?.target2_dis[0]}x
                        
                        </span></td>
                    </>
                  )}
                  <td>
                    <div className="w-full">
                      <div className="flex gap-4 justify-center items-center">
                        {!editFlag || editFlag !== item?.id ? (
                          <Edit
                            onClick={() => {setEditFlag(item?.id)}}
                            size={15}
                            className="text-yellow-500 cursor-pointer"
                          />
                        ) : (
                          <Check
                            onClick={() => handleUpdate(item)}                     
                            size={15}
                            className="text-blue-500 cursor-pointer"
                          />
                        )}
                        <Trash
                          onClick={() => deleteMut.mutate([item?.symbol_code,'daily'])}
                          size={15}
                          className="text-red-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
}
