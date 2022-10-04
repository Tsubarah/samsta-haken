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
// import { current } from "daisyui/src/colors";
import marker from "../assets/images/marker.png";

const Map = ({ position }) => {
	const [activeMarker, setActiveMarker] = useState(null);
	const [filteredRestaurants, setFilteredRestaurants] = useState(null);
	const { data: restaurants, loading } = useGetRestaurants();
	const { currentCityName, setCurrentCityName } = useCurrentLocation();
	////////
	const {
		searchedCity,
		setShowRestaurantCard,
		showRestaurantCard,
		restaurantData,
		setRestaurantData,
		currentCity,
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
		setActiveMarker(null);
		setShowRestaurantCard(!showRestaurantCard);

		if (marker === activeMarker) {
			return;
		}

		setActiveMarker(marker);
		restaurant = restaurants?.find((restaurant) => restaurant.id === marker);
		setRestaurantData(restaurant);
	};

	// DENNA SKA ANVÄNDAS ISTÄLLET FÖR ATT MAPA UT DÄR NERE (EJ KLAR)
	const getFilteredRestaurants = (restaurants) => {
		setFilteredRestaurants(null);
		if (searchedCity) {
			const filteredRestaurantsBySearch = restaurants.filter(
				(restaurant) => restaurant.city === searchedCity && restaurant.accepted
			);

			setFilteredRestaurants(filteredRestaurantsBySearch);
		}

		if (currentCity) {
			const filteredRestaurantsByLoc = restaurants.filter(
				(restaurant) => restaurant.city === currentCity && restaurant.accepted
			);

			setFilteredRestaurants(filteredRestaurantsByLoc);
			setCurrentCityName(null);
		}
	};

	const onLoad = useCallback((map) => {
		const zoom = 18;
		map.setZoom(zoom);
	}, []);

	useEffect(() => {
		if (!position) {
			setNewLocation(defaultLocation);
		} else {
			setNewLocation(position);
		}
		getFilteredRestaurants(restaurants);
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
			{filteredRestaurants?.map((restaurant) => (
				<Marker
					key={restaurant.id}
					position={restaurant.position}
					icon={{
						url: marker,
					}}
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
