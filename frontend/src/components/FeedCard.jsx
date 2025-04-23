const FeedCard = ({user}) => {
    const {firstName,lastName,age,gender} = user;
    return(
        <div>
          <div className="card bg-black w-96 shadow-sm mt-5">
            <figure>
                <img
                src=" https://cdn-icons-png.flaticon.com/512/3641/3641599.png "
                alt="Shoes"
                className="h-65" />
            </figure>
            {firstName && <div className="card-body flex justify-center gap-1 items-center">
                <h2 className="card-title">{firstName}&nbsp;&nbsp;{lastName}</h2>
                <p>{gender}</p>
                <p className="mt-1">This is a default about information of the user</p>
                <div className="card-actions justify-end">
                <div className="flex justify-center gap-1 items-center mt-5">
                    <button className="btn btn-primary bg-blue-500">Ignore</button>
                    <button className="btn btn-primary bg-pink-400">Interested</button>
                </div>
                </div>
            </div>}
          </div>
        </div>
    )
}

export default FeedCard;