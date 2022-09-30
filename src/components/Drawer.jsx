import { useState } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import useGetCollection from "../hooks/useGetCollection"
import useGetDocument from "../hooks/useGetDocument"
import useGetRestaurants from "../hooks/useGetRestaurants"
import RestaurantCard from "./RestaurantCard"
import { MdPlace } from "react-icons/md";

const Drawer = ({ children }) => {
  const restaurantQuery = useGetRestaurants()
  const { drawerIsOpen, 
          setDrawerIsOpen,
          restaurantData,
          setRestaurantData, 
          showRestaurantCard, 
          setShowRestaurantCard } = useAuthContext()
  // const [showRestaurantCard, setShowRestaurantCard] = useState(false)
  // const [restaurantData, setRestaurantData] = useState(null)
  let restaurant;
  console.log(restaurantQuery)

  const handleClick = async (e) => {
    restaurant = restaurantQuery.data?.find(restaurant => restaurant.id === e.currentTarget.id)
    setRestaurantData(restaurant)
    setShowRestaurantCard(!showRestaurantCard)
  }

  return (
    <div className="drawer h-full drawer-end relative">
      <input
        id="my-drawer-4"
        type="checkbox"
        checked={drawerIsOpen}
        onChange={setDrawerIsOpen}
        className="drawer-toggle"
      />
      <div className="drawer-content">
        {children}
        <label
          htmlFor="my-drawer-4"
          className="drawer-button btn btn-primary hidden">
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <ul className="menu overflow-y-auto w-96 bg-base-100 text-base-content">
          {restaurantQuery?.data
            .filter(restaurant => restaurant.accepted === true)
            .map((restaurant) => (
            <li 
              id={restaurant.id} 
              key={restaurant.id} 
              onClick={handleClick}
            >
              <div className="flex justify-between p-6">
                {restaurant.name}
                <p className="text-xs opacity-50">
                  {restaurant.city}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {showRestaurantCard && (
        <div className="overflow-y-auto bg-primary flex absolute lg:right-96 lg:top-auto z-50">
          {showRestaurantCard && <RestaurantCard restaurant={restaurantData} />}
        </div>
      )}
    </div>
  );
}

export default Drawer