import { useDispatch, useSelector } from "react-redux";
import './index.css';
import { setFloatingsearchId, sethidefloatingsearch } from "../../../../redux/initialData";
const FloatingSearch = ({value,setSearchInput}) => {
    const data = useSelector(e=>e.data.value)
    const users = data.data
    const show = data.hidefloatingsearch
    
    const dispatch = useDispatch()

    return ( <div dir="rtl" className={`bg-white border ${show === '' && 'hidden'} overflow-hidden  floating-search  rounded-lg p-2 absolute top-full  left-0 w-full max-h-52`}>
           <ul className="floating-search overflow-auto h-[90%]">
            {users.filter(e=>e.name.includes(show) || e.id.includes(show)).map(e=>
                <li onClick={()=>{dispatch(setFloatingsearchId(e.id));dispatch(sethidefloatingsearch(e.name))}} className="text-[.8em] byekan hover:bg-amber-200 px-2 rounded-lg text-gray-500 py-1 cursor-pointer">{e.name}<span>{' - '+e.id}</span></li>
            )
            }
           </ul>
    </div> );
}
 
export default FloatingSearch;