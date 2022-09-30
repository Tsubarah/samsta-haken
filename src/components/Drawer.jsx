import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import useGetCollection from "../hooks/useGetCollection";
import useGetDocument from "../hooks/useGetDocument";
import useGetRestaurants from "../hooks/useGetRestaurants";
import RestaurantCard from "./RestaurantCard";
import { MdPlace } from "react-icons/md";

const Drawer = ({ children }) => {
	const restaurantQuery = useGetRestaurants();
	const { drawerIsOpen, setDrawerIsOpen } = useAuthContext();
	const [showRestaurantCard, setShowRestaurantCard] = useState(false);
	const [restaurantData, setRestaurantData] = useState(null);
	let restaurant;

	const handleClick = async (e) => {
		restaurant = restaurantQuery.data?.find(
			(restaurant) => restaurant.id === e.currentTarget.id
		);
		setRestaurantData(restaurant);
		setShowRestaurantCard(!showRestaurantCard);
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
					className="drawer-button btn btn-primary hidden"
				>
					Open drawer
				</label>
			</div>
			<div className="drawer-side grid-cols-1 lg:grid-cols-3 scrollbar-hide">
				<label htmlFor="my-drawer-4" className="drawer-overlay hidden"></label>

				<div className="flex flex-wrap relative bg-base-100 lg:col-span-full lg:col-end-4 scrollbar-thin scrollbar-thumb-base-content scrollbar-track-black">
					{showRestaurantCard && drawerIsOpen && (
						<RestaurantCard restaurant={restaurantData} />
					)}

					<div className="px-2 font-semibold text-white text-lg lg:hidden bg-base-content w-full">
						<div className="divider">Restauranger</div>
					</div>

					<ul className="menu w-full lg:w-96 text-base-content">
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
			</div>
		</div>
	);
};

export default Drawer;
