import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import FeedCard from "./FeedCard"

const Connections = () => {

  const[connections,setconnections] = useState([]);
  const[isEmpty,setisEmpty] = useState(false);

  async function fetchConnections(){
    const response = await axios.get("http://localhost:3000/user/connections",{
        withCredentials:true
    })
    if(response.status === 200)
    {
      setconnections(response.data);
      (response.data.length === 0)
      {
        setisEmpty(true);
      }
    }
  }

  useEffect(() => {
    fetchConnections();
  },[])

  return (
    <div>
      <div>
      <p className='absolute right-[680px] text-3xl font-mono top-18'>Connections</p>
      </div>
       {connections && <div className='flex flex-wrap justify-around items-center mt-10.5'>
         {connections.map((card,index) => (
            <FeedCard key={index} user = {card} showActions={false}/>
         ))}
       </div>}
    </div>
  )
}

export default Connections