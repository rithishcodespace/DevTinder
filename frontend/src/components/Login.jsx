import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,seterror] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        console.log(email, password);
      let response = await axios.post(
        "http://localhost:3000/login",
        { emailId: email, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        alert("success");
        dispatch(addUser(response.data));
        console.log(response.data)
        navigate("/");
      }
    }
    catch(error){
      seterror(error.response.data);
    }
    
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-black p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Login</h2>

        <div className="mb-4">
          <label className="block mb-1 text-black">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-black text-black bg-white rounded focus:outline-none focus:ring-2 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-black">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-black text-black bg-white rounded focus:outline-none focus:ring-2 focus:ring-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <p className="text-red-700 relative bottom-3">{error}</p>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
