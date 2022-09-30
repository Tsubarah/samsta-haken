<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import { useState } from "react";
>>>>>>> dev
import { useAuthContext } from "../contexts/AuthContext";
import useGetCollection from "../hooks/useGetCollection";
import useGetDocument from "../hooks/useGetDocument";
import useGetRestaurants from "../hooks/useGetRestaurants";
import RestaurantCard from "./RestaurantCard";
import { MdPlace } from "react-icons/md";
import { orderBy } from "@firebase/firestore";

const Drawer = ({ children }) => {
  const [sortQuery, setSortQuery] = useState("");
  //setSortQuery(orderBy("name"))
  const restaurantQuery = useGetRestaurants(sortQuery);
  const { drawerIsOpen, setDrawerIsOpen } = useAuthContext();
  const [showRestaurantCard, setShowRestaurantCard] = useState(false);
  const [restaurantData, setRestaurantData] = useState(null);
  let restaurant;
  console.log(restaurantQuery)

  const handleClick = async (e) => {
    restaurant = restaurantQuery.data?.find(
      (restaurant) => restaurant.id === e.currentTarget.id
    );
    setRestaurantData(restaurant);
    setShowRestaurantCard(!showRestaurantCard);
  };

  useEffect(() => {
    console.log("Soryquery: ", sortQuery)
    return () => {
    
    }
  }, [restaurantQuery.data, sortQuery])

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
          <div className="dropdown dropdown-end col-start-12 justify-self-center">
            <label tabIndex={0} className="btn btn-ghost">
              Filter
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <button
                  className="justify-between"
                  onClick={() => setSortQuery("name")}>
                  Sortera efter namn
                </button>
              </li>
            </ul>
          </div>
          {restaurantQuery.data?.map((restaurant) => (
            <li id={restaurant.id} key={restaurant.id} onClick={handleClick}>
              <div className="flex justify-between p-6">
                {restaurant.name}
                <p className="text-xs opacity-50">{restaurant.city}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="overflow-y-auto bg-primary flex absolute lg:right-96 lg:top-auto z-50">
        {showRestaurantCard && <RestaurantCard restaurant={restaurantData} />}
      </div>
    </div>
  );
};

export default Drawer;
