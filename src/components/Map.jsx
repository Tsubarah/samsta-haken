import {
	GoogleMap,
	useJsApiLoader,
	Marker,
	InfoWindow,
} from "@react-google-maps/api";
import { useState, useEffect, useCallback } from "react";
import useGetRestaurants from "../hooks/useGetRestaurants";
import useCurrentLocation from "../hooks/useCurrentLocation";

const Map = ({ position }) => {
	const [activeMarker, setActiveMarker] = useState(null);
	const { data: restaurants, loading } = useGetRestaurants();
	const { currentCityName } = useCurrentLocation();

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
	});

	const handleActiveMarker = (marker) => {
		if (marker === activeMarker) {
			return;
		}
		setActiveMarker(marker);
	};

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
			console.log("current city name", currentCityName);
		}
	}, [position]);

	return isLoaded ? (
		<GoogleMap
			mapContainerClassName="w-full h-full"
			center={newLocation}
			onLoad={onLoad}
			onClick={() => setActiveMarker(null)}
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
			{restaurants
				.filter((restaurant) => restaurant.city === currentCityName)
				.map((restaurant) => (
					<Marker
						key={restaurant.id}
						position={restaurant.position}
						onClick={() => handleActiveMarker(restaurant.id)}
					>
						{activeMarker === restaurant.id ? (
							<InfoWindow onCloseClick={() => setActiveMarker(null)}>
								<div>{restaurant.name}</div>
							</InfoWindow>
						) : null}
					</Marker>
				))}
		</GoogleMap>
	) : (
		<></>
	);
};

export default Map;
