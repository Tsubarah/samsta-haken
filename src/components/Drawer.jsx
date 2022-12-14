import { useAuthContext } from "../contexts/AuthContext";
import useGetRestaurants from "../hooks/useGetRestaurants";
import { getDistance } from "../utils/helpers";
import RestaurantCard from "./RestaurantCard";
import { food } from "../db/food";
import { useState } from "react";
import { useEffect } from "react";

const Drawer = ({ children }) => {
	const [showFilters, setShowFilters] = useState(false);
	const [lat, setLat] = useState(null);
	const [lng, setLng] = useState(null);
	const restaurants = useGetRestaurants();

	const {
		drawerIsOpen,
		setDrawerIsOpen,
		restaurantData,
		setRestaurantData,
		showRestaurantCard,
		setShowRestaurantCard,
		currentUser,
		isAdmin,
		setFilterType,
		filterType,
	} = useAuthContext();

	// Shows distance from user location to restaurant
	const showDistance = (restaurantCoords) => {
		if (!lat && !lng) return;

		const distance = getDistance(
			lat,
			lng,
			restaurantCoords?.position?.lat,
			restaurantCoords?.position?.lng
		);

		return distance;
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	};

	let restaurant;

	// Events for when user clicks on restaurant in drawer
	const handleClick = async (e) => {
		restaurant = restaurants.data?.find(
			(restaurant) => restaurant.id === e.currentTarget.id
		);
		setRestaurantData(restaurant);
		setShowRestaurantCard(true);

		//scroll to top
		scrollToTop();
	};

	useEffect(() => {
		// Fetching current location of user to calculate distance to restaurants
		navigator.geolocation.getCurrentPosition((position) => {
			let latitude = position.coords.latitude;
			let longitude = position.coords.longitude;

			setLat(latitude);
			setLng(longitude);
		});
	}, [lat, lng]);

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
				<label
					htmlFor="my-drawer-4"
					className="drawer-overlay hidden"
				></label>

				<div className="flex flex-wrap relative bg-base-100 lg:col-span-full lg:col-end-4 scrollbar-thin scrollbar-thumb-base-content scrollbar-track-black">
					{showRestaurantCard && drawerIsOpen && (
						<RestaurantCard
							restaurant={restaurantData}
							currentUser={currentUser}
							isAdmin={isAdmin}
							showDistance={showDistance}
							lat={lat}
							lng={lng}
						/>
					)}

					<div className="px-2 font-semibold text-white text-lg lg:hidden bg-base-content w-full">
						<div className="divider">Restauranger</div>
					</div>

					{/* Filter button and dropdown */}
					<div className="flex flex-col w-full lg:w-96">
						<button
							className="btn font-display text-lg"
							onClick={() => setShowFilters(!showFilters)}
						>
							Filtrera
						</button>

						{showFilters && (
							<div className="col-span-full grid gap-1 grid-rows-2 px-4 py-4">
								{/* Filter by cuisine */}
								<select
									className="select select-bordered select-sm indent-1 font-normal bg-primary"
									defaultValue="Filtrera p?? k??k"
									onChange={(e) =>
										setFilterType({
											type: "cuisine",
											value: e.target.value,
										})
									}
								>
									<option disabled>Filtrera p?? k??k</option>
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

								{/* Filter by type of meal restaurants offer */}
								<select
									className="select select-bordered select-sm indent-1 font-normal bg-primary"
									defaultValue="Filtrera p?? typ"
									onChange={(e) =>
										setFilterType({
											type: "offers_food",
											value: e.target.value,
										})
									}
								>
									<option disabled>Filtrera p?? typ</option>
									{food &&
										food.offers_food.map((type, i) => (
											<option key={i} value={type}>
												{type}
											</option>
										))}
								</select>

								{/* Reset filter button */}
								<div className="pt-4 flex justify-center">
									<button
										className="btn btn-sm"
										onClick={() => setFilterType(null)}
									>
										??terst??ll filter
									</button>
								</div>
							</div>
						)}

						{/* List of restaurants in drawer */}
						<ul className="menu w-full lg:w-96 text-base-content">
							<div className="text-sm pr-2 opacity-60 text-right">
								{filterType && (
									<h1>Filtrerar efter: {filterType.value}</h1>
								)}
							</div>
							{restaurants?.data.length ? (
								restaurants.data.map((restaurant) => {
									const dist = showDistance(restaurant);
									return (
										<li
											id={restaurant.id}
											key={restaurant.id}
											onClick={handleClick}
										>
											<div className="flex justify-between p-6">
												{restaurant.name}

												<p className="text-xs opacity-50">
													{restaurant.city}
													<span className="cursor-ponter">
														{dist &&
															`, ${Math.floor(
																dist
															)} km`}
													</span>
												</p>
											</div>
										</li>
									);
								})
							) : (
								<h1 className="text-center">
									Sorry, no bad restaurants in that category
									yet????
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
