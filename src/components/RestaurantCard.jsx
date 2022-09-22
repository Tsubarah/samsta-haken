
const RestaurantCard = ({ data }) => {

  return (
    <>
      <div className="card max-h-50 card-side bg-base-100 shadow-xl">
        <div className="flex flex-col">
          <div className="card-body grid grid-cols-12 items-between px-0 pb-0">

            <img src="https://placeimg.com/200/280/arch" alt="restaurant" className="col-span-5 object-cover"/>

            <div className="item-description col-start-7 col-span-6">
                <h2 className="card-title">{data.name}</h2>
                <p>{data.cuisine}</p>
                <p>{data.city}</p>
                <p>{data.offers_food}</p>
                <p>{data.address}</p>
            </div>
            <div className="collapse col-span-12 justify-start">
              <input type="checkbox" /> 
              <div className="collapse-title p-0 text-xl font-medium">
                🔽
              </div>
              <div className="collapse-content"> 
                <p>{data.description}</p>
              </div>
            </div>

            </div>
        </div>
      </div>
    </>
  )
}

export default RestaurantCard