import { useEffect } from "react";
import { useState } from "react";
import Map from "../components/Map";
import SearchForm from "../components/SearchForm";
import TipsForm from "../components/TipsForm";
import useCurrentLocation from "../hooks/useCurrentLocation";
import { getLocationWithAddress } from "../services/GoogleAPI";
import { useAuthContext } from '../contexts/AuthContext'

const HomePage = () => {

	const { currentUser } = useAuthContext()

	const { getCurrentLocation, positionLatLng, positionAddress } =
		useCurrentLocation();

	const [showTips, setShowTips] = useState(false);

	const [location, setLocation] = useState(null);
	const [address, setAddress] = useState(null);

	const handleSearch = async (address) => {
		const addressResponse = await getLocationWithAddress(address);

		setLocation(addressResponse.results[0].geometry.location);
		setAddress(addressResponse.results[0].formatted_address);
	};

	useEffect(() => {
		if (positionLatLng) {
			setLocation(positionLatLng);
			setAddress(positionAddress);
		}
	}, [positionLatLng]);

	return (
		<div className="h-full flex flex-col">
			<div className="grid grid-cols-3 gap-4 bg-gray-500 p-4 items-center">
				<div className="flex gap-4">
					<h1>Home</h1>

					<button onClick={() => setShowTips(!showTips)}>Tipsa!</button>
				</div>

				<SearchForm
					handleSearch={handleSearch}
					handleCurrentLocation={getCurrentLocation}
					className="col-end-6"
				/>
			</div>

			<Map position={location} />

			<div className="bg-gray-500 p-4 text-center">
				{address ? <p>Adress: {address}</p> : "Sämsta Haket Inc"}
				{currentUser ? <p>{currentUser.email}</p> : ''}
			</div>

			{showTips && <TipsForm showTips={showTips} setShowTips={setShowTips} />}
		</div>
	);
};

export default HomePage;
