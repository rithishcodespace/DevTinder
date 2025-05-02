import React from 'react'
import axios from "axios";
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { addRequests, removeRequests } from '../utils/requestSlice';

const Requests = () => {

  const dispatch = useDispatch();
  const selector = useSelector((Store) => Store.requestSlice);

  async function handleClick(status,userId)
  {
    const res = await axios.post(`/api/request/review/${status}/${userId}`,{},{
      headers:{
        "Content-Type":"Application/json"
      },
      withCredentials:true
    })
    if(response.status === 200)
    {
      dispatch(removeRequests(userId));
    }
  }

  async function fetchRequest()
  {
    const response = await axios.get("/api/user/requests/received",{
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
      {selector && selector.length == 0 && <div className='flex justify-center items-center relative top-52 text-2xl'><p>NO CONNECTION REQUEST FOUND</p></div>}
      {selector && selector.map((card,index) => (
       <div>
         <div className="card bg-black w-96 shadow-sm m-3">
            <figure>
                <img
                src=" https://cdn-icons-png.flaticon.com/512/3641/3641599.png "
                alt="Shoes"
                className="h-65" />
            </figure>
            <div className="card-body flex justify-center gap-1 items-center">
                <h2 className="card-title">{card.fromUserId.firstName}&nbsp;&nbsp;{card.fromUserId.lastName}</h2>
                <p className="mt-1">This is a default about information of the user</p>
                <div className="card-actions justify-end">
                <div className="flex justify-center gap-1 items-center mt-5">
                    <button className="btn btn-primary bg-green-500" onClick={() => handleClick('accepted',card.fromUserId._id)}>Accept</button>
                    <button className="btn btn-primary bg-red-400" onClick={() => handleClick('rejected',card.fromUserId._id)}>Reject</button>
                </div>
                </div>
            </div>
          </div>
       </div>
      ))}
    </div>
  )
}

export default Requests