import { useNavigate } from "react-router-dom";

const RestaurantsTable = ({ restaurants }) => {
	const navigate = useNavigate();

	return (
		<div className="overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-black">
			<table className="table table-zebra w-full">
				{/* <!-- head --> */}
				<thead>
					<tr>
						<th></th>
						<th>Namn</th>
						<th>Adress</th>
						<th>Stad</th>
						<th>Typ av kök</th>
						<th>Typ av matställe</th>
						<th>Utbud</th>
						<th>Hemsida</th>
						<th>E-post</th>
						<th>Tel</th>
						<th>Facebook</th>
						<th>Instagram</th>
						<th>Redigera</th>
						<th>Godkänd</th>
					</tr>
				</thead>
				<tbody>
					{restaurants.map((restaurant, i) => (
						<tr key={restaurant.id}>
							<td>{i + 1}</td>
							<td>{restaurant.name}</td>
							<td>{restaurant.address}</td>
							<td>{restaurant.city}</td>
							<td>{restaurant.cuisine}</td>
							<td>{restaurant.type_of_place}</td>
							<td>{restaurant.offers_food}</td>

							{restaurant.socials.map((social, i) => (
								<td key={i}>{social.value}</td>
							))}
							<td>
								<button
									className="btn btn-sm btn-info"
									onClick={() => navigate(`/restaurants/${restaurant.id}`)}
								>
									Redigera
								</button>
							</td>

							<td className="text-center">
								{restaurant.accepted ? (
									<button className="btn btn-success btn-sm">J</button>
								) : (
									<button className="btn btn-error btn-sm">N</button>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default RestaurantsTable;
