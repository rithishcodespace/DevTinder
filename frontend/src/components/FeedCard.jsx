import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const FeedCard = ({ user, showActions = true }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, age, gender, _id } = user;

  async function handleConnections(status, _id) {
    try {
      const response = await axios.post(`${BASE_URL}/request/send/${status}/${_id}`, {}, { withCredentials: true });
      dispatch(removeUserFromFeed(_id));
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="card bg-black w-96 shadow-sm m-3">
        <figure>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3641/3641599.png"
            alt="Shoes"
            className="h-65"
          />
        </figure>

        {firstName && (
          <div className="card-body flex justify-center gap-1 items-center">
            <h2 className="card-title">{firstName}&nbsp;&nbsp;{lastName}</h2>
            <p>{gender}</p>
            <p className="mt-1">This is a default about information of the user</p>

            {showActions && (
              <div className="card-actions justify-end">
                <div className="flex justify-center gap-1 items-center mt-5">
                  <button className="btn btn-primary bg-blue-500" onClick={() => handleConnections('ignored', _id)}>Ignore</button>
                  <button className="btn btn-primary bg-pink-400" onClick={() => handleConnections('interested', _id)}>Interested</button>
                </div>
              </div>
            )}
            {!showActions && 
              <Link to={`chat/${_id}`}><button className="btn btn-primary bg-violet-400 m-2">Chat</button></Link>
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedCard;
