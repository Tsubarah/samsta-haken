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
		filterType,
		drawerIsOpen,
		setDrawerIsOpen,
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
				(restaurant) => restaurant.city === searchedCity
			);

			setFilteredRestaurants(filteredRestaurantsBySearch);
		}

		if (currentCity) {
			const filteredRestaurantsByLoc = restaurants.filter(
				(restaurant) => restaurant.city === currentCity
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
	}, [position, restaurants]);

	return isLoaded ? (
    <GoogleMap
      mapContainerClassName="w-full h-full"
      center={newLocation}
      onLoad={onLoad}
      onClick={() => {
        handleActiveMarker;
        setDrawerIsOpen(false);
      }}
      options={{
        styles: [
          {
            elementType: "labels",
            featureType: "poi.business",
            stylers: [{ visibility: "off" }],
          },
          {
            elementType: "geometry",
            stylers: [
              {
                color: "#242f3e",
              },
            ],
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#746855",
              },
            ],
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#242f3e",
              },
            ],
          },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [
              {
                color: "#38414e",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#212a37",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#9ca5b3",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [
              {
                color: "#746855",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#1f2835",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#f3d19c",
              },
            ],
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                color: "#09090B",
              },
            ],
          },
        ],
      }}>
      <Marker position={newLocation} />
      {filteredRestaurants?.map((restaurant) => (
        <Marker
          key={restaurant.id}
          position={restaurant.position}
          icon={{
            url: marker,
          }}
          onClick={() => {
            handleActiveMarker(restaurant.id);
            setDrawerIsOpen(!showRestaurantCard);
          }}>
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
