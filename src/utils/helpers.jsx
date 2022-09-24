// Helper to find the value of socials type
export const findSocialsValue = (source, type) => {
	let values = source.find((social) => social.title === type);

	return <span>{values?.value}</span>;
};
