import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        { emailId: email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        alert("Login success");
        dispatch(addUser(response.data));
        localStorage.setItem("userDetails",JSON.stringify(response.data));
        navigate("/home");
      }
    } catch (error) {
      setError(error.response?.data || "Login failed");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName,
          lastName,
          emailId: email,
          password,
          age,
          gender: gender,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert("Signup success");
        dispatch(addUser(response.data));
        localStorage.setItem("userDetails",JSON.stringify(response.data));
        navigate("/profile");
      }
    } catch (error) {
      setError(error.response?.data || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#1e1e1e]">
      <form
        onSubmit={isLoginForm ? handleSubmit : handleSignup}
        className="bg-[#2d2d2d] p-10 rounded-lg shadow-lg text-center w-full max-w-md"
      >
        {isLoginForm && <div className="mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1995/1995564.png"
            alt="avatar"
            className="w-28 h-28 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-white mb-1">DevTinder</h2>
          <p className="text-gray-400">
            {isLoginForm ? "Login" : "Signup"} to your account
          </p>
        </div>}

        {!isLoginForm && (
          <>
            <div className="mb-4 text-left">
              <label className="block mb-1 text-white">First Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-600 bg-[#1e1e1e] text-white rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4 text-left">
              <label className="block mb-1 text-white">Last Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-600 bg-[#1e1e1e] text-white rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </>
        )}

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

        {!isLoginForm && (
          <>
            <div className="mb-4 text-left">
              <label className="block mb-1 text-white">Age</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-600 bg-[#1e1e1e] text-white rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>

            <div className="mb-4 text-left">
              <label className="block mb-1 text-white">Gender</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-600 bg-[#1e1e1e] text-white rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              />
            </div>
          </>
        )}

        <p className="text-red-500 text-sm mb-4">{error}</p>

        <button
          type="submit"
          className="cursor-pointer w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
        >
          {isLoginForm ? "Login" : "Signup"}
        </button>

        <p
          className="m-2 text-white text-sm cursor-pointer"
          onClick={() => setIsLoginForm(!isLoginForm)}
        >
          {isLoginForm
            ? "New User? Signup here!"
            : "Existing User? Login here"}
        </p>

        <p className="text-gray-500 text-xs mt-4">
          © ACME Industries Ltd. Providing reliable tech since 1992
        </p>
      </form>
    </div>
  );
}

export default Login;
