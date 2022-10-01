import {
	GoogleMap,
	useJsApiLoader,
	Marker,
	InfoWindowF,
} from "@react-google-maps/api";
import { useState, useEffect, useCallback } from "react";
import useGetRestaurants from "../hooks/useGetRestaurants";
import { useAuthContext } from "../contexts/AuthContext";
import useCurrentLocation from "../hooks/useCurrentLocation";

const Map = ({ position }) => {
	const [activeMarker, setActiveMarker] = useState(null);
	const { data: restaurants, loading } = useGetRestaurants();
	const { currentCityName } = useCurrentLocation()
	////////
	const { searchedCity, 
					setShowRestaurantCard, 
					showRestaurantCard, 
					setRestaurantData 
				} = useAuthContext();
	//////////
	const [newLocation, setNewLocation] = useState(null);
	let restaurant;
	const defaultLocation = { lat: 55.604981, lng: 13.003822 };

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
	});

	const handleActiveMarker = (marker) => {
		setActiveMarker(null)
		setShowRestaurantCard(!showRestaurantCard)

		if (marker === activeMarker) {
			return;
		} 
		
		setActiveMarker(marker);
		restaurant = restaurants?.find(restaurant => restaurant.id === marker)
		setRestaurantData(restaurant)
	};

	const getFilteredRestaurants = (restaurants) => {
		
	}

	const onLoad = useCallback((map) => {
		const zoom = 18;
		map.setZoom(zoom);
	}, []);

	console.log("currentCityName", currentCityName)
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
			onClick={handleActiveMarker}
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
			// LÄGG I FUNKTION
				.filter((restaurant) => 
					restaurant.city === searchedCity || currentCityName &&
					restaurant.accepted === true)
				.map((restaurant) => (
					<Marker
						key={restaurant.id}
						position={restaurant.position}
						onClick={() => handleActiveMarker(restaurant.id)}
					>
						{activeMarker === restaurant.id ? (
							<InfoWindowF onCloseClick={handleActiveMarker}>
								<div>{restaurant.name}</div>
							</InfoWindowF>
						) : null}
					</Marker>
				))}
		</GoogleMap>
	) : (
		<></>
	);
};

export default Map;
