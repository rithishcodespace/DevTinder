import React from 'react'
import axios from "axios";
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { addRequests } from '../utils/requestSlice';
import FeedCard from './feedCard';

const Requests = () => {

  const dispatch = useDispatch();
  const selector = useSelector((Store) => Store.requestSlice);

  async function fetchRequest()
  {
    const response = await axios.get("http://localhost:3000/user/requests/received",{
      headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true
    })
    if(response.status === 200)
    {
      dispatch(addRequests(response.data));
      console.log(response.data)
    }
  }

  useEffect(() => {
   fetchRequest();
  },[]);

  return (
    <div className='flex justify-center items-center'>
      {selector && selector.length == 0 && <p>NO CONNECTION REQUEST FOUND</p>}
      {selector && selector.map((card,index) => (
       <FeedCard user={card.fromUserId}/>
      ))}
    </div>
  )
}

export default Requests