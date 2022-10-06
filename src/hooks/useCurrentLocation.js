import { useState } from "react";
import { getLocationWithLatLng } from "../services/GoogleAPI";
import { findCity } from "../utils/helpers";

const useCurrentLocation = () => {
	const [positionAddress, setPositionAddress] = useState("");
	const [positionLatLng, setPositionLatLng] = useState(null);
	const [currentCityName, setCurrentCityName] = useState(null);

	const getCurrentLocation = () => {
		if (!navigator.geolocation) {
			alert("Geolocation is not supported by your browser!");
		} else {
			navigator.geolocation.getCurrentPosition(async (position) => {
				try {
					let latitude = position.coords.latitude;
					let longitude = position.coords.longitude;

					const geolocation = await getLocationWithLatLng(latitude, longitude);

					const currentCity = findCity(geolocation);

					setCurrentCityName(currentCity);
					setPositionAddress(geolocation.results[0].formatted_address);
					setPositionLatLng({ lat: latitude, lng: longitude });
				} catch (err) {
					alert("Unable to retrieve your location");
				}
			});
		}
	};

	// useEffect(() => {
	// 	getCurrentLocation();
	// }, []);

	return {
		positionLatLng,
		positionAddress,
		setPositionLatLng,
		currentCityName,
		setCurrentCityName,
		getCurrentLocation,
	};
};

export default useCurrentLocation;
