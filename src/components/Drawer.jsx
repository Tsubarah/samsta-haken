import { useAuthContext } from "../contexts/AuthContext";
import useGetRestaurants from "../hooks/useGetRestaurants";
import { getDistance } from "../utils/helpers";
import RestaurantCard from "./RestaurantCard";
import { food } from "../db/food";
import { useState } from "react";
import { FaWindowRestore } from "react-icons/fa";

const Drawer = ({ children }) => {
	const [showFilters, setShowFilters] = useState(false);
	const restaurantQuery = useGetRestaurants();

	const {
		drawerIsOpen,
		setDrawerIsOpen,
		restaurantData,
		setRestaurantData,
		showRestaurantCard,
		setShowRestaurantCard,
		currentUser,
		isAdmin,
		location,
		setFilterType,
    filterType
	} = useAuthContext();

	const showDistance = (restaurantCoords) => {
		if (!location) {
			return;
		}

		const distance = getDistance(
			location.lat,
			location.lng,
			restaurantCoords?.position?.lat,
			restaurantCoords?.position?.lng
		);

		return distance;
	};
  

	let restaurant;

	const handleClick = async (e) => {
		restaurant = restaurantQuery.data?.find(
			(restaurant) => restaurant.id === e.currentTarget.id
		);
		setRestaurantData(restaurant);
		setShowRestaurantCard(true);

	};


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
      <div className="drawer-side grid-cols-1 lg:grid-cols-3 scrollbar-hide">
        <label htmlFor="my-drawer-4" className="drawer-overlay hidden"></label>

        <div className="flex flex-wrap relative bg-base-100 lg:col-span-full lg:col-end-4 scrollbar-thin scrollbar-thumb-base-content scrollbar-track-black">
          {showRestaurantCard && drawerIsOpen && (
            <RestaurantCard
              restaurant={restaurantData}
              currentUser={currentUser}
              isAdmin={isAdmin}
              showDistance={showDistance}
            />
          )}

          <div className="px-2 font-semibold text-white text-lg lg:hidden bg-base-content w-full">
            <div className="divider">Restauranger</div>
          </div>

          <div className="flex flex-col w-full lg:w-96">
            <button
              className="btn font-display text-lg"
              onClick={() => setShowFilters(!showFilters)}>
              Filtrera
            </button>
            {showFilters && (
              <div className="col-span-full grid gap-1 grid-rows-2 px-4 py-4">
                <select
                  className="select select-bordered select-sm indent-1 font-normal bg-primary"
                  defaultValue="Filtrera på kök"
                  onChange={(e) =>
                    setFilterType({
                      type: "cuisine",
                      value: e.target.value,
                    })
                  }>
                  <option disabled>Filtrera på kök</option>
                  {food &&
                    food.cuisine.map((type, i) => (
                      <option key={i} value={type}>
                        {type}
                      </option>
                    ))}
                </select>

                <div className="divider">
                  <span className="opacity-60">eller</span>
                </div>

                <select
                  className="select select-bordered select-sm indent-1 font-normal bg-primary"
                  defaultValue="Filtrera på typ"
                  onChange={(e) =>
                    setFilterType({
                      type: "offers_food",
                      value: e.target.value,
                    })
                  }>
                  <option disabled>Filtrera på typ</option>
                  {food &&
                    food.offers_food.map((type, i) => (
                      <option key={i} value={type}>
                        {type}
                      </option>
                    ))}
                </select>

                <div className="pt-4 flex justify-center">
                  <button
                    className="btn btn-sm"
                    onClick={() => setFilterType(null)}>
                    Återställ filter
                  </button>
                </div>
              </div>
            )}

            <ul className="menu w-full lg:w-96 text-base-content">
              <div className="text-sm pr-2 opacity-60 text-right">
                {filterType && <h1>Filtrerar efter: {filterType.value}</h1>}
              </div>
              {restaurantQuery?.data.length ? (
                // .filter((restaurant) => restaurant.accepted === true)
                restaurantQuery.data.map((restaurant) => {
                  const dist = showDistance(restaurant);

                  return (
                    <li
                      id={restaurant.id}
                      key={restaurant.id}
                      onClick={handleClick}>
                      <div className="flex justify-between p-6">
                        {restaurant.name}

                        <p className="text-xs opacity-50">
                          {restaurant.city}
                          <span className="cursor-ponter">
                            {dist && `, ${Math.floor(dist)} km`}
                          </span>
                        </p>
                      </div>
                    </li>
                  );
                })
              ) : (
                <h1 className="text-center">
                  Sorry, no bad restaurants in that category yet😿
                </h1>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
