import { useParams } from "react-router-dom";
import useGetDocument from "../hooks/useGetDocument";

const RestaurantPage = () => {
	const { id } = useParams();

	const { data: restaurant } = useGetDocument("restaurants", id);

	console.log(restaurant);

	return <div>RestaurantPage</div>;
};

export default RestaurantPage;
