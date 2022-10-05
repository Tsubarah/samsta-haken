import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import useCurrentLocation from "../hooks/useCurrentLocation";
import useGetCollection from "../hooks/useGetCollection";

import { TiLocationArrow } from "react-icons/ti";
import { BiSearch } from "react-icons/bi";

const SearchForm = ({ className }) => {
	const {
		handleSearch,
		setAddress,
		address,
		setSearchedCity,
		setCurrentCity,
		setSearchParams,
	} = useAuthContext();

	const {
		positionLatLng,
		positionAddress,
		setPositionLatLng,
		currentCityName,
		getCurrentLocation,
	} = useCurrentLocation();

	const [searchInput, setSearchInput] = useState("");

	const { data: restaurants } = useGetCollection("restaurants");

	const filteredRestaurants =
		searchInput === ""
			? restaurants
			: restaurants.filter((restaurant) => {
					return (
						restaurant.city.toLowerCase().includes(searchInput.toLowerCase()) ||
						restaurant.name.toLowerCase().includes(searchInput.toLowerCase())
					);
			  });

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!searchInput.length) {
			return;
		}

		setPositionLatLng(null);

		setAddress(positionAddress);
		handleSearch(searchInput);
		setSearchInput("");
	};

	const handleCurrentLocation = () => {
		getCurrentLocation();
	};

	useEffect(() => {
		if (positionLatLng) {
			setSearchedCity(null);
			setCurrentCity(currentCityName);
			setSearchParams({
				city: currentCityName,
				lat: positionLatLng.lat,
				lng: positionLatLng.lng,
			});
			setAddress(positionAddress);
		}
	}, [positionLatLng, address]);

	return (
		<form
			onSubmit={handleSubmit}
			className={`flex justify-center items-center gap-2 ${className}`}
		>
			<TiLocationArrow
				onClick={handleCurrentLocation}
				size={25}
				className="cursor-pointer"
			/>

			<div className="input-group">
				<input
					type="text"
					placeholder={address ? address : "Sök..."}
					onChange={(e) => setSearchInput(e.target.value)}
					value={searchInput}
					className="input input-sm input-bordered w-full"
				/>

				<button className="btn btn-sm btn-square">
					<BiSearch size={20} />
				</button>
			</div>

			{searchInput.length > 0 && filteredRestaurants.length > 0 && (
				<ul className="absolute top-12 px-2 py-4 z-10 bg-base-100 w-4/6 lg:w-5/12 h-1/5 overflow-scroll scrollbar-thin scrollbar-thumb-base-content scrollbar-track-black">
					{filteredRestaurants?.map((restaurant) => (
						<li
							key={restaurant.id}
							className="cursor-pointer hover:bg-base-300 p-2"
							onClick={() =>
								setSearchInput(`${restaurant.address}, ${restaurant.city}`)
							}
						>
							{restaurant.name}, {restaurant.city}
						</li>
					))}
				</ul>
			)}
		</form>
	);
};

export default SearchForm;
