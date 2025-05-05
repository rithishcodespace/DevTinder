import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import FeedCard from "./FeedCard";
import { BASE_URL } from "../utils/constants";

function EditProfile({user}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName,setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [age,setage] = useState(user.age);
  const [gender,setgender] = useState(user.gender);
  const [toast,settoast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`${BASE_URL}/profile/edit`,{
        "firstName":firstName,
        "lastName":lastName,
        "age":age,
        "gender":gender
      },{withCredentials:true})
      if(response.status === 200)
      {
        settoast(true);
        setTimeout(()=>settoast(false),1000)
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#1e1d1d] gap-3.5">
      {toast &&
       <div>
        <div className="toast">
          <div className="alert alert-info">
            <span>Profile Updated successfully!</span>
          </div>
        </div>
       </div>}
      <form
        onSubmit={handleSubmit}
        className="bg-[#2d2d2d] p-10 rounded-lg shadow-lg text-center w-full max-w-md"
      >
        <div className="mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/16382/16382273.png "
            alt="avatar"
            className="w-28 h-28 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-white mb-1">DevTinder</h2>
          <p className="text-gray-400">Edit your profile</p>
        </div>

        <div className="mb-4 text-left">
          <label className="block mb-1 text-white">firstName</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-600 bg-[#1e1e1e] text-white rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 text-left">
          <label className="block mb-1 text-white">lastName</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-600 bg-[#1e1e1e] text-white rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 text-left">
          <label className="block mb-1 text-white">age</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-600 bg-[#1e1e1e] text-white rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={age}
            onChange={(e) => setage(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 text-left">
          <label className="block mb-1 text-white">gender</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-600 bg-[#1e1e1e] text-white rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={gender}
            onChange={(e) => setgender(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
        >
          update
        </button>

      </form>
      <FeedCard user={{firstName,lastName,age,gender}}/>
    </div>
    
  );
}

export default EditProfile;