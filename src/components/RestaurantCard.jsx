
const RestaurantCard = ({ data }) => {
  const backgroundImage = 
  console.log(data)
  return (
    <>
      <div className="card max-h-50 card-side bg-base-100 shadow-xl">
        <div className="flex-col">
          <div className="card-body flex-row justify-evenly px-0 pb-0">
            <figure className="w-20"><img src="https://placeimg.com/200/280/arch" alt="restaurant"/></figure>
            <div className="item-description">
              <h2 className="card-title">{data.name}</h2>
              <p>{data.cuisine}</p>
              <p>{data.city}</p>
              <p>{data.offers_food}</p>
              <p>{data.address}</p>
            </div>
          </div>
          <div className="collapse">
            <input type="checkbox" /> 
            <div className="collapse-title text-xl font-medium">
              🔽
            </div>
            <div className="collapse-content"> 
              <p>{data.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RestaurantCard