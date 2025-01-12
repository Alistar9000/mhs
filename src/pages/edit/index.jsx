import { useDispatch } from 'react-redux';
import './index.css';
import { setHeaderName } from '../../redux/initialData';
import { useEffect } from 'react';
import Add from '../add/index';

const Edit = () => {

    const dispatch = useDispatch()
    useEffect(()=>{
        
      dispatch(setHeaderName('ویرایش سبد'));
  },[])
    return ( 
      <Add type="edit"/>
      );
}
 
export default Edit;