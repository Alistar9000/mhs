import { useState } from "react";
import { BiSortDown } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setUsersSort } from "../../../../redux/initialData";

const UsersSort = ({name,setSort,sort}) => {
     const [upclicked,setUpClicked] = useState(false)
     const [downclicked,setDownClicked] = useState(false)
     const dispatch = useDispatch()
     
     const uphandleclick = ()=>{
      downclicked && setDownClicked(false) ; 
     !upclicked ? setSort({name:name,trend:'up'}) : setSort({name:'',trend:''})
     setUpClicked(!upclicked);
     }
     const downhandleclick = ()=>{
        upclicked && setUpClicked(false) ; 
      !downclicked ?  setSort({name:name,trend:'down'}) :  setSort({name:'',trend:''})
        setDownClicked(!downclicked);
       
     }
    return ( 
        <div className="flex *:cursor-pointer">
        <BiSortDown className={`rotate-180 ${downclicked && 'text-orange-500'}`} onClick={downhandleclick}/>
        <BiSortDown className={`${upclicked && 'text-orange-500'}`} onClick={uphandleclick}/>

        </div>
     );
}
 
export default UsersSort;