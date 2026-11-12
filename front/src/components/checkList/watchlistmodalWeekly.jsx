import { IterationCcw, Plus, Trash2, X } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useFieldArray } from 'react-hook-form';
import api from '../../api/axios';
import { useWatchList } from '../../hooks/useWatchList';
import { convertPersianNumbersToEnglish } from '../../utils/PersiantoEnglishDigit';

export default function WatchListModalWeekly({showModal,setShowModal}) {
  
    const {addMut} = useWatchList('weekly')
    const counter = useRef(1)
    const [list,setList] = useState([
       
    ])

    const append = () => {
        setList(e=> [...e,{id:counter.current++,symbol:"",target1:"",target2:""}])
    }
    const remove = (id) => {
        setList(e=> e.filter( x => x.id !== id))
    }
    const register = (e) => {
      e.preventDefault()
      addMut.mutate(['weekly',list])
      setShowModal(false)
      setList([])
    }
    const handleChange = (id,e) => {
     
      setList(l => l.map(item => 
         item.id === id ? {...item,[e.target.name]: convertPersianNumbersToEnglish(e.target.value)} : item
         
      ))
       
    }
    
  return (
    <div onClick={()=>setShowModal(false)} className={`fixed ${showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'} flex justify-center items-center transition-opacity duration-300 inset-0 bg-transparent`}>
        <form onSubmit={register} onClick={e=>e.stopPropagation()} className={`h-[80vh] rounded-lg w-full sm:w-1/2 mx-auto  flex flex-col gap-2 border bg-white shadow sm:px-6 px-4 py-4`}>
            <div className="flex justify-end"><X size={15} onClick={()=>setShowModal(false)} className='cursor-pointer' /></div>
              <div className="flex-1">
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-sm font-medium">لیست نمادها</h4>
                  <button
                    type="button"
                   onClick={append}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-md"
                  >
                    <Plus className="w-4 h-4" />
                    افزودن نماد
                  </button>
                </div>

                <div className="space-y-2 overflow-auto min-h-20 max-h-96">
                {

                    list?.map((item) => 

                               
                    <div
                       key={item?.id}
                      className={`grid grid-cols-12 gap-2 items-start `}
                    >
                      <div className="col-span-3">
                        <input
                          onChange={(e)=>handleChange(item?.id,e)}
                          name='symbol'
                            required
                          value={item?.symbol}
                          placeholder="نماد"
                          className="w-full p-2 border rounded"
                        />
                        {/* {errors?.holdings?.[idx]?.symbol && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.holdings?.[idx].symbol.message}
                          </p>
                        )} */}
                      </div>
                    
                      <div className="col-span-3">
                        <input
                          name='target1'
                          onChange={(e)=>handleChange(item?.id,e)}
                          type="number"
                           value={item?.target1}
                          placeholder="تارگت اول"
                          className="w-full p-2 border rounded"
                        />
                        {/* {errors?.holdings?.[idx]?.quantity && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.holdings?.[idx].quantity.message}
                          </p>
                        )} */}
                      </div>
                      <div className="col-span-3">
                        <input
                          name='target2'
                          type="number"
                           value={item?.target2}
                          onChange={(e)=>handleChange(item?.id,e)}
                          placeholder="تارگت دوم"
                          className="w-full p-2 border rounded"
                        />
                        {/* {errors?.holdings?.[idx]?.quantity && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.holdings?.[idx].quantity.message}
                          </p>
                        )} */}
                      </div>

                      <div className="col-span-2 flex gap-2">
                        <button
                          type="button"
                        onClick={() => remove(item?.id)}
                          className="p-2 bg-red-100 mt-1 rounded"
                        >
                          <Trash2 className="w-4 h-4  text-red-600" />
                        </button>
                      </div>
                    </div>)
}      
                </div>
              </div>
              <div className="flex justify-end">
                <input type='submit' className='py-1 px-6 rounded-md bg-green-500 text-white cursor-pointer focus-within:bg-green-400' value={'ثبت'}/>

              </div>
        </form>

    </div>
  )
}
