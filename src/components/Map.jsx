import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useState, useEffect, useCallback } from "react";
import useGetRestaurants from "../hooks/useGetRestaurants";

const Map = ({ position }) => {
	const { data: restaurants, loading } = useGetRestaurants();
	// console.log(restaurants)

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
	});

	const onLoad = useCallback((map) => {
		const zoom = 18;
		map.setZoom(zoom);
	}, []);

	const defaultLocation = { lat: 55.604981, lng: 13.003822 };
	const [newLocation, setNewLocation] = useState(null);

	useEffect(() => {
		if (!position) {
			setNewLocation(defaultLocation);
		} else {
			setNewLocation(position);
		}
	}, [position]);

	return isLoaded ? (
		<GoogleMap
			mapContainerClassName="w-full h-full"
			center={newLocation}
			onLoad={onLoad}
			options={{
				styles: [
					{
						elementType: "labels",
						featureType: "poi.business",
						stylers: [{ visibility: "off" }],
					},
				],
			}}
		>
			<Marker position={newLocation} />
			{restaurants.map((restaurant) => (
				<Marker key={restaurant.id} position={restaurant.position} />
			))}
		</GoogleMap>
	) : (
		<></>
	);
};

export default Map;
