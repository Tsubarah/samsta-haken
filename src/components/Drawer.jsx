import { useAuthContext } from "../contexts/AuthContext";
import useGetRestaurants from "../hooks/useGetRestaurants";
import { getDistance } from "../utils/helpers";
import RestaurantCard from "./RestaurantCard";
import { food } from "../db/food";

const Drawer = ({ children }) => {

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

          <ul className="menu w-full lg:w-96 text-base-content">
            <div className="dropdown dropdown-hover">
              <div className="col-span-full grid grid-rows-2 px-4">
                <select
                  className="select select-bordered select-sm indent-1 font-normal bg-primary"
                  defaultValue="Filtrera på kök"
                  onChange={(e) => setFilterType(e.target.value)}>
                  <option disabled>Filtrera på kök</option>
                  {food &&
                    food.cuisine.map((type, i) => (
                      <option key={i} value={type}>
                        {type}
                      </option>
                    ))}
                </select>
              </div>
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
              <h1 className="text-center">Sorry, no bad restaurants in that category yet😿</h1>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
