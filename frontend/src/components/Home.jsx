import React from 'react';
import axios from "axios";
import { useDispatch,useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const fetchUser = async() => { // you cant go to anyother page without logging in since this api will be on everypage, as it is the root level component
     try{
        const response = await axios.get("http://localhost:3000/profile/view",{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true // it sends the token to the backend
        })
        console.log(response);
        if(response.status == 200)dispatch(addUser(response.data));
        else navigate("/login");
     }
     catch(error)
     {
       navigate("/login");
     }
    
   }
   useEffect(()=>{
      fetchUser();
   },[]) // root of jwt auth

  return (
    <div>Home</div>
  )
}

export default Home