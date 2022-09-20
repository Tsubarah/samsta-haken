import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useCallback, memo } from "react";

const userLocation = { lat: 55.6299416, lng: 13.5135172 };

const Map = () => {
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
	});

	const onLoad = useCallback(async (map) => {
		const bounds = new window.google.maps.LatLngBounds(userLocation);
		await map.fitBounds(bounds);
	}, []);

	return isLoaded ? (
		<GoogleMap
			mapContainerClassName="w-full h-full"
			zoom={10}
			center={userLocation}
			onLoad={onLoad}
		>
			<Marker position={userLocation} />
		</GoogleMap>
	) : (
		<></>
	);
};

export default memo(Map);
