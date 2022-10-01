// Helper to find the value of socials type
export const findSocialsValue = (source, type) => {
	let values = source.find((social) => social.title === type);

	return <span>{values?.value}</span>;
};

export const findCity = (geolocation) => {
	const postalTownIndex = geolocation.results
		.map((location) => location.types)
		.findIndex((location) => location == "postal_town");

	const city =
		geolocation.results[postalTownIndex].address_components[0].long_name;

	return city;
};

export const findSearchedCity = (adressResponse) => {
	let city;

	if (adressResponse) {
		const adressComponents = adressResponse.results.map(
			(location) => location.address_components
		);

		const postalTownIndex = adressComponents[0]
			.map((location) => location.types)
			.findIndex((location) => location == "postal_town");

		const localityIndex = adressComponents[0]
			.map((location) => location.types)
			.findIndex((location) => location.includes("locality"));

		if (postalTownIndex !== -1) {
			city =
				adressResponse.results[0].address_components[postalTownIndex].long_name;
		} else {
			city =
				adressResponse.results[0].address_components[localityIndex].long_name;
		}
	}

	return city;
};
