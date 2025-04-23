import axios from "axios";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import FeedCard from "./feedCard";
import { addFeed } from "../utils/feedSlice";

const Feed = () =>{

    const dispatch = useDispatch();
    const selector = useSelector((Store) => Store.feedSlice);
    async function getFeed()
    {
       const response = await axios.get("http://localhost:3000/feed?page=1&limit=10",{
        headers:{
            "Content-Type":"application/json"
        },
        withCredentials : true
       })
       if(response.status === 200)dispatch(addFeed(response.data));
       console.log(response.data);
    }

 useEffect(() => {
   getFeed();
 },[]);

    return(
        <div className="flex justify-around items-center">
          {selector.length > 0 && <FeedCard user={selector[0]}/>}
        </div>
    )
}

export default Feed;