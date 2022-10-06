// Helper to find the value of socials type
export const findSocialsValue = (source, type) => {
	let values = source.find(social => social.title === type);

	return <span>{values?.value}</span>;
};

export const findCity = geolocation => {
	const postalTownIndex = geolocation.results
		.map(location => location.types)
		.findIndex(location => location == "postal_town");

	const city =
		geolocation.results[postalTownIndex].address_components[0].long_name;

	return city;
};

export const findSearchedCity = adressResponse => {
	let city;

	if (adressResponse) {
		const adressComponents = adressResponse.results.map(
			location => location.address_components
		);

		const postalTownIndex = adressComponents[0]
			.map(location => location.types)
			.findIndex(location => location == "postal_town");

		const localityIndex = adressComponents[0]
			.map(location => location.types)
			.findIndex(location => location.includes("locality"));

		if (postalTownIndex !== -1) {
			city =
				adressResponse.results[0].address_components[postalTownIndex]
					.long_name;
		} else {
			city =
				adressResponse.results[0].address_components[localityIndex]
					.long_name;
		}
	}

	return city;
};

export const getFileExtension = image => {
	const fileName = image.name;
	const extension = fileName.substr(fileName.lastIndexOf("."));

	return extension;
};

const deg2rad = deg => {
	return deg * (Math.PI / 180);
};

export const getDistance = (lat1, lon1, lat2, lon2) => {
	const R = 6371; // Radius of the earth in km
	const dLat = deg2rad(lat2 - lat1);
	const dLon = deg2rad(lon2 - lon1);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) *
			Math.cos(deg2rad(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const d = R * c; // Distance in km
	return d;
};

//Only change if there is a new value
export const checkValue = (newValue, oldValue) => {
	if (newValue == "") {
		return oldValue;
	} else {
		return newValue;
	}
};

export const checkIfStringHasNumber = str => {
	return /[0-9]/.test(str);
};
