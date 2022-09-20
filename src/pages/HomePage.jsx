import { useEffect } from "react";
import { useState } from "react";
import Map from "../components/Map";
import SearchForm from "../components/SearchForm";
import TipsForm from "../components/TipsForm";
import useCurrentLocation from "../hooks/useCurrentLocation";
import { getFormattedAddress } from "../services/GoogleAPI";

const HomePage = () => {
	const { getCurrentLocation, currentAddress } = useCurrentLocation();
	const [formattedAddress, setFormattedAddress] = useState("");
	const [showTips, setShowTips] = useState(false);

	console.log("Current address on location", currentAddress);

	const handleSearch = async (address) => {
		const addressResponse = await getFormattedAddress(address);

		setFormattedAddress(addressResponse.results[0].formatted_address);
	};

	useEffect(() => {
		console.log("Searched for this address:", formattedAddress);
	}, [formattedAddress]);

	return (
		<div className="h-full flex flex-col">
			<div className="flex gap-4 bg-gray-500 p-4">
				<h1 className="m-auto">Home</h1>

				<button onClick={getCurrentLocation}>Current position</button>

				<SearchForm handleSearch={handleSearch} />

				<button onClick={() => setShowTips(!showTips)}>Tipsa!</button>
			</div>

			<Map />

			<div className="bg-gray-500 p-4">MOCK FOOTER</div>

			{showTips && <TipsForm showTips={showTips} setShowTips={setShowTips} />}
		</div>
	);
};

export default HomePage;
