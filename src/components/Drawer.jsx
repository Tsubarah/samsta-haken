import { useEffect } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import useGetRestaurants from "../hooks/useGetRestaurants"
import RestaurantCard from "./RestaurantCard"

const Drawer = ({ children }) => {
  const restaurantQuery = useGetRestaurants()
  const { drawerIsOpen, setDrawerIsOpen } = useAuthContext()

  return (
    <div className="drawer h-full drawer-end">
      <input id="my-drawer-4" type="checkbox" checked={drawerIsOpen} onChange={setDrawerIsOpen} className="drawer-toggle" />
      <div className="drawer-content">
        {children}
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary hidden">Open drawer</label>
      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <ul className="menu overflow-y-auto w-96 bg-base-100 text-base-content">
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