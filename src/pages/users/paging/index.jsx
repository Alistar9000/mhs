const UsersPageing = (props) => {
    const {index,selectedIndex,value,handleClick,show} = props; 
    return ( 
        <li  onClick={handleClick} className={` border  ${!show ? 'bg-gray-100/70 ':'text-gray-800 bg-white ring-1'}`}>{value}</li>
     );
}
 
export default UsersPageing;