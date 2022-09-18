import axios from "axios";

axios.defaults.baseURL = "https://maps.googleapis.com/maps/api/geocode";
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

/**
 * Get address based on current position
 */
export const getAddress = async (lat, lon) => {
	const res = await axios.get(`/json?latlng=${`${lat},${lon}`}&key=${API_KEY}`);

	return res.data;
};
