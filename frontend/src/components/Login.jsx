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
  const [error, seterror] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
        console.log(response.data);
        navigate("/");
      }
    } catch (error) {
      seterror(error.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#1e1e1e]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#2d2d2d] p-10 rounded-lg shadow-lg text-center w-full max-w-md"
      >
        <div className="mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1995/1995564.png"
            alt="avatar"
            className="w-28 h-28 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-white mb-1">DevTinder</h2>
          <p className="text-gray-400">Login to your account</p>
        </div>

        <div className="mb-4 text-left">
          <label className="block mb-1 text-white">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-600 bg-[#1e1e1e] text-white rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 text-left">
          <label className="block mb-1 text-white">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-600 bg-[#1e1e1e] text-white rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <p className="text-red-500 text-sm mb-4">{error}</p>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
        >
          Login
        </button>

        <p className="text-gray-500 text-xs mt-4">
          © ACME Industries Ltd. Providing reliable tech since 1992
        </p>
      </form>
    </div>
  );
}

export default Login;