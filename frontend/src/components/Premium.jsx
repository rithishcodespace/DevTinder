import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Premium = () => {

    const buyMemberShip = async (memberShipType) => {
        console.log("logging:"+memberShipType)
       const order = await axios.post(BASE_URL+"/payment/create_order",{"memberShipType":memberShipType},{withCredentials:true, headers:{"Content-Type":"application/json"}})
     
       // if we got the order data, we can call the dialogue box
    
       const{amount,keyId,currency,notes,orderId} = order.data;
       
       const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount: amount, // Data from the backend is mapped to the check box
        currency: currency,
        name: 'DevTinder',
        description: 'Connect to other developers',
        order_id: orderId, // This is the order_id created in the backend
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.email,
        },
        theme: {
          color: '#F37254' // dialoguebox color
        },
      };
       const rzp = new window.Razorpay(options); 
       rzp.open();
    }

    return(
        <div className="flex justify-evenly mt-18">
          <div className="flex align-middle bg-amber-600 h-78 flex-col p-8 rounded-md">
            <h2 className="text-2xl font-bo">BRONZE MEMBERSHIP</h2>
            <ul className="mt-6 flex align-middle gap-3.5 flex-col">
                <li>- Upto 100 connetion requests per day</li>
                <li>- Blue tick</li>
                <li>- Chat with other people</li>
                <li>- 3 months validity</li>
            </ul>
            <button onClick={()=>buyMemberShip('bronze')} className="rounded-md mt-2.5 bg-amber-700 h-18 cursor-pointer">Join Bronze</button>
          </div>
          <div className="flex align-middle bg-gray-300 h-78 flex-col p-8 rounded-md">
            <h2 className="text-2xl">SILVER MEMBERSHIP</h2>
            <ul className="mt-6 flex align-middle gap-3.5 flex-col">
                <li>- Upto 500 connetion requests per day</li>
                <li>- Blue tick</li>
                <li>- Chat with other people</li>
                <li>- 3 months validity</li>
            </ul>
            <button onClick={()=>buyMemberShip('silver')} className="rounded-md mt-2.5 cursor-pointer bg-gray-400 h-18">Join Silver</button>
          </div>
          <div className="flex align-middle bg-amber-300 h-78 flex-col p-8 rounded-md">
            <h2 className="text-2xl">GOLD MEMBERSHIP</h2>
            <ul className="mt-6 flex align-middle gap-3.5 flex-col">
                <li>- Unlimited connetion requests per day</li>
                <li>- Blue tick</li>
                <li>- Chat with other people</li>
                <li>- 3 months validity</li>
            </ul>
            <button onClick={()=>buyMemberShip('gold')} className="rounded-md cursor-pointer mt-2.5 bg-yellow-500 h-18">Join Bronze</button>
          </div>
        </div>
    )
}

export default Premium;