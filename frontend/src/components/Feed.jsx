import axios from "axios";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import FeedCard from "./feedCard";
import { addUserToFeed } from "../utils/feedSlice";

const Feed = () =>{

    const dispatch = useDispatch();
    const selector = useSelector((Store) => Store.feedSlice);
    async function getFeed()
    {
       const response = await axios.get("http://localhost:3000/feed?page=1&limit=1",{
        headers:{
            "Content-Type":"application/json"
        },
        withCredentials : true
       })
       if(response.status === 200){
        dispatch(addUserToFeed(response.data));
        console.log(response.data);
       }
       console.log(response.data);
    }

 useEffect(() => {
   getFeed();
 },[]);

 if(selector.length <= 0)return <h1>NO NEW USERS FOUND</h1>

    return(
        <div className="flex justify-around items-center">
          {selector.length > 0 && selector[0] !== undefined && <FeedCard user={selector[0]} />}
        </div>
    )
}

export default Feed;