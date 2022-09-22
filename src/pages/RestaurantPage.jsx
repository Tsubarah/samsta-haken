import { useParams } from "react-router-dom";

const RestaurantPage = () => {
	const { id } = useParams();

	return <div>RestaurantPage</div>;
};

export default RestaurantPage;
