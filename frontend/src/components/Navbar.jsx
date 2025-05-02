import React from 'react'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom';
import {useDispatch} from "react-redux" 
import { removeUser } from '../utils/userSlice';

const Navbar = () => {

  const dispatch = useDispatch();  
  const navigate = useNavigate();
  async function handleLogout()
  {
    const response = await axios.delete("/api/logout",{
        withCredentials:true
    })
    if(response.status == 200)
    {   
        dispatch(removeUser);
        navigate("");
    }
  }

  return (
    <div>
            <div className="navbar bg-black shadow-sm">
    <div className="flex-1">
    <Link to="/feed"><a className="btn btn-ghost text-xl">DevTinder</a></Link>
    </div>
    <div className="flex gap-2">
        <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full" onClick={() => navigate("")}>  
            <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                
            </div>
        </div>
        <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
            <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
            </Link>
            </li>
            <li><Link to="request">Connection request</Link></li>
            <li><Link to="connections">Connections</Link></li>
            <li onClick={handleLogout}><a href="">Logout</a></li>
        </ul>
        </div>
    </div>
    </div>
    </div>
  )
}

export default Navbar