import { useState } from "react";
import { getLocationWithLatLng } from "../services/googleAPI";

const useCurrentLocation = () => {
	const [positionAddress, setPositionAddress] = useState("");
	const [positionLatLng, setPositionLatLng] = useState(null);

	const getCurrentLocation = () => {
		if (!navigator.geolocation) {
			console.log("Geolocation is not supported by your browser!");
		} else {
			navigator.geolocation.getCurrentPosition(async (position) => {
				try {
					let latitude = position.coords.latitude;
					let longitude = position.coords.longitude;

					const geolocation = await getLocationWithLatLng(latitude, longitude);

					console.log(geolocation)

					setPositionAddress(geolocation.results[0].formatted_address);
					setPositionLatLng({ lat: latitude, lng: longitude });
				} catch (err) {
					console.log("Unable to retrieve your location");
				}
			});
		}
	};

	return {
		getCurrentLocation,
		positionLatLng,
		positionAddress,
		setPositionLatLng,
	};
};

export default useCurrentLocation;
