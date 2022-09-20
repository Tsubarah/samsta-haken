import { useEffect } from "react";
import { useState } from "react";
import Map from "../components/Map";
import SearchForm from "../components/SearchForm";
import TipsForm from "../components/TipsForm";
import useCurrentLocation from "../hooks/useCurrentLocation";
import { getLocationWithAddress } from "../services/GoogleAPI";

const HomePage = () => {
	const { getCurrentLocation, positionLatLng } = useCurrentLocation();

	const [showTips, setShowTips] = useState(false);

	const [location, setLocation] = useState(null);

	const handleSearch = async (address) => {
		const addressResponse = await getLocationWithAddress(address);

		setLocation(addressResponse.results[0].geometry.location);
	};

	useEffect(() => {
		if (positionLatLng) {
			setLocation(positionLatLng);
		}
	}, [positionLatLng]);

	return (
		<div className="h-full flex flex-col">
			<div className="flex gap-4 bg-gray-500 p-4">
				<h1 className="m-auto">Home</h1>

				<button onClick={getCurrentLocation}>Current position</button>

				<SearchForm handleSearch={handleSearch} />

				<button onClick={() => setShowTips(!showTips)}>Tipsa!</button>
			</div>

			<Map position={location} />

			<div className="bg-gray-500 p-4">MOCK FOOTER</div>

			{showTips && <TipsForm showTips={showTips} setShowTips={setShowTips} />}
		</div>
	);
};

export default HomePage;
