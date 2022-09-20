import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useCallback } from "react";

const Map = ({ position }) => {
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
	});

	const onLoad = useCallback((map) => {
		const zoom = 18;
		map.setZoom(zoom);
	}, []);

	const defaultLocation = { lat: 55.604981, lng: 13.003822 };

	return isLoaded ? (
		<GoogleMap
			mapContainerClassName="w-full h-full"
			center={position ? position : defaultLocation}
			onLoad={onLoad}
		>
			<Marker position={position ? position : defaultLocation} />
		</GoogleMap>
	) : (
		<></>
	);
};

export default Map;
