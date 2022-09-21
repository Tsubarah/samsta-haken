import { useEffect, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { BiSearch } from "react-icons/bi";
import { useAuthContext } from "../contexts/AuthContext";
import useCurrentLocation from "../hooks/useCurrentLocation";

const SearchForm = ({ className }) => {
	const { handleSearch, setLocation, setAddress, address } = useAuthContext();

	const {
		getCurrentLocation,
		positionLatLng,
		positionAddress,
		setPositionLatLng,
	} = useCurrentLocation();

	const [searchInput, setSearchInput] = useState("");
	const [placeholder, setPlaceholder] = useState("Sök...");

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!searchInput.length) {
			return;
		}
		setPositionLatLng(null);
		handleSearch(searchInput);
		setSearchInput("");
	};

	useEffect(() => {
		if (positionLatLng) {
			setLocation(positionLatLng);
			setAddress(positionAddress);
		}

		// setSearchInput(address);
		if (address) {
			setPlaceholder(address);
		}
	}, [positionLatLng, address]);

	return (
		<form
			onSubmit={handleSubmit}
			className={`flex justify-center items-center gap-2 ${className}`}
		>
			<TiLocationArrow
				onClick={getCurrentLocation}
				size={25}
				className="cursor-pointer"
			/>

			<div className="input-group">
				<input
					type="text"
					placeholder={placeholder}
					onChange={(e) => setSearchInput(e.target.value)}
					value={searchInput}
					className="input input-sm input-bordered w-full"
				/>

				<button className="btn btn-sm btn-square">
					<BiSearch size={20} />
				</button>
			</div>
		</form>
	);
};

export default SearchForm;
