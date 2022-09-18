import { useState } from "react";
import { getAddress } from "../services/googleAPI";

const useCurrentLocation = () => {
	const [currentAddress, setCurrentAddress] = useState();

	const getCurrentLocation = () => {
		if (!navigator.geolocation) {
			console.log("Geolocation is not supported by your browser!");
		} else {
			navigator.geolocation.getCurrentPosition(async (position) => {
				try {
					let latitude = position.coords.latitude;
					let longitude = position.coords.longitude;

					const geolocation = await getAddress(latitude, longitude);

					setCurrentAddress(geolocation.results[0]);
				} catch (err) {
					console.log("Unable to retrieve your location");
				}
			});
		}
	};

	return { getCurrentLocation, currentAddress };
};

export default useCurrentLocation;
