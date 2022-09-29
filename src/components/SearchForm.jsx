import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import useCurrentLocation from "../hooks/useCurrentLocation";
import useGetCollection from "../hooks/useGetCollection";

import { Combobox } from "@headlessui/react";
import { TiLocationArrow } from "react-icons/ti";
import { BiSearch } from "react-icons/bi";

const SearchForm = ({ className }) => {
	const { handleSearch, setLocation, setAddress, address, searchedCity } =
		useAuthContext();

	const {
		getCurrentLocation,
		positionLatLng,
		positionAddress,
		setPositionLatLng,
		currentCityName,
	} = useCurrentLocation();

	const [searchInput, setSearchInput] = useState("");
	const [placeholder, setPlaceholder] = useState("Sök...");
	const [city, setCity] = useState(null);

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
		//* HÄr ska city name från search i context
		setCity(searchedCity);
		handleSearch(searchInput);
		setSearchInput("");
	};

	useEffect(() => {
		if (positionLatLng) {
			console.log(positionLatLng);
			setLocation(positionLatLng);
			setAddress(positionAddress);
			// setCity(currentCityName);
		}

		if (address) {
			setPlaceholder(address);
		}

	}, [positionLatLng, address, city]);

	return (
		<div
			className={`flex justify-center items-center gap-2 relative ${className}`}
		>
			<TiLocationArrow
				onClick={getCurrentLocation}
				size={25}
				className="cursor-pointer"
			/>

			<Combobox
				as="form"
				className="input-group relative"
				value={searchInput}
				onChange={setSearchInput}
				onSubmit={handleSubmit}
			>
				<Combobox.Input
					type="text"
					placeholder={placeholder}
					onChange={(e) => setSearchInput(e.target.value)}
					value={searchInput}
					className="input input-sm input-bordered w-full"
				/>

				<Combobox.Options className="absolute top-10 px-4 pb-2 bg-base-100 w-full z-10 rounded-b-md">
					{filteredRestaurants.map((restaurant) => (
						<Combobox.Option
							key={restaurant.id}
							value={`${restaurant.address}, ${restaurant.city}`}
							className="cursor-pointer hover:bg-base-300 p-2"
						>
							{restaurant.name}, {restaurant.city}
						</Combobox.Option>
					))}
				</Combobox.Options>

				<Combobox.Button className="btn btn-sm btn-square" type="submit">
					<BiSearch size={20} />
				</Combobox.Button>
			</Combobox>
		</div>
	);
};

export default SearchForm;
