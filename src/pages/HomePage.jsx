import { useEffect } from "react";
import { useState } from "react";
import SearchForm from "../components/SearchForm";
import useCurrentLocation from "../hooks/useCurrentLocation";
import { getFormattedAddress } from "../services/GoogleAPI";

const HomePage = () => {
	const { getCurrentLocation, currentAddress } = useCurrentLocation();
	const [formattedAddress, setFormattedAddress] = useState("");

	console.log("Current address on location", currentAddress);

	const handleSearch = async (address) => {
		const addressResponse = await getFormattedAddress(address);

		setFormattedAddress(addressResponse.results[0].formatted_address);
	};

	useEffect(() => {
		console.log("Searched for this address:", formattedAddress);
	}, [formattedAddress]);

	return (
		<div className="flex">
			<h1 className="m-auto">Home</h1>

			<button onClick={getCurrentLocation}>Current position</button>

			<SearchForm handleSearch={handleSearch} />
		</div>
	);
};

export default HomePage;
