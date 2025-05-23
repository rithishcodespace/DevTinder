import React from 'react';
import {useSelector} from "react-redux";
import EditProfile from './EditProfile';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Profile = () => {
  // const selector = useSelector((Store) => Store.userSlice);
  const [profile,setprofile] = useState("");
  async function fetchData()
  {
    const response = await axios.get(`${BASE_URL}/profile/view`,{
      withCredentials:true
    })
    if(response.status === 200)setprofile(response.data);
  }

  useEffect(() => {
   fetchData();
  },[]);

  return (
    <div>
      {profile && <EditProfile user = {profile}/>}
    </div>
  )
}

export default Profile