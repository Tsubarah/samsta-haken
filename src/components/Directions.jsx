import { useEffect, useState } from "react";
import { FaDirections } from "react-icons/fa";

const Directions = ({ restaurant, lat, lng }) => {
	const [link, setLink] = useState(null);

	// Generates link with directions from user location
	useEffect(() => {
		if (!lat && !lng) {
			return;
		}

		setLink(
			`https://www.google.com/maps/dir/${lat},${lng}/${restaurant?.position?.lat},${restaurant?.position?.lng}`
		);
	}, [lat, lng]);

	return (
		<a href={link} target="_blank" className="link">
			<FaDirections size={20} />
		</a>
	);
};

export default Directions;
