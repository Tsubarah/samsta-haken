// Helper to find the value of socials type
export const findSocialsValue = (source, type) => {
	let values = source.find((social) => social.title === type);

	return <span>{values?.value}</span>;
};

export const findCity = (geolocation) => {
	const postalTownIndex = geolocation.results.map(location => location.types).findIndex(location => location == 'postal_town')

	const city = geolocation.results[postalTownIndex].address_components[0].long_name

	return city
}