import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { FaDirections } from "react-icons/fa";

const Directions = ({ restaurant }) => {
	const { location } = useAuthContext();

	const [link, setLink] = useState(null);

	const showDirections = () => {
		if (!location) {
			return;
		}

		setLink(
			`https://www.google.com/maps/dir/${location.lat},${location.lng}/${restaurant?.position?.lat},${restaurant?.position?.lng}`
		);
	};

	useEffect(() => {
		showDirections();
	}, [location]);

	return (
		location && (
			<a href={link} target="_blank" className="link">
				<FaDirections size={20} />
			</a>
		)
	);
};

export default Directions;
