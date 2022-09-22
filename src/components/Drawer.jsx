import { useEffect } from "react"
import useGetRestaurants from "../hooks/useGetRestaurants"
import RestaurantCard from "./RestaurantCard"

const Drawer = ({ children }) => {
  const restaurantQuery = useGetRestaurants()

  useEffect(() => {
    console.log(restaurantQuery)
    console.log(restaurantQuery.data)
  }, [])

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {children}
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary z-20">Open drawer</label>
      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <ul className="menu overflow-y-auto w-80 bg-base-100 text-base-content">
          {restaurantQuery.data?.map(restaurant => (
            <li key={restaurant.id}>
              <RestaurantCard data={restaurant} />
            </li>
          ))}
        </ul>  
      </div>
    </div>
  )
}

export default Drawer