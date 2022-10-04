import { useParams } from "react-router-dom";
import RestaurantEditCard from "../components/RestaurantEditCard";
import useGetDocument from "../hooks/useGetDocument";

const RestaurantPage = () => {
	const { id } = useParams();

	const { data: restaurant } = useGetDocument("restaurants", id);

	return (
		<div className="h-full flex items-center justify-center bg-neutral overflow-hidden">
			<RestaurantEditCard restaurant={restaurant} />
		</div>
	);
};

export default RestaurantPage;
