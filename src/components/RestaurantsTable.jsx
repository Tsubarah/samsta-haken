import { useNavigate } from "react-router-dom";
import { useTable, useSortBy } from "react-table";

const RestaurantsTable = ({ restaurants, restaurantsColumns }) => {
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ restaurantsColumns, restaurants }, useSortBy);

	const navigate = useNavigate();

	return (
		<div className="overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-black">
			{/* <table {...getTableProps()} className="table table-zebra w-full">
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps(column.getSortByToggleProps())}>
									{column.render("Header")}
									<span>
										&nbsp;-
										{column.isSorted
											? column.isSortedDesc
												? " 🔽"
												: " 🔼"
											: ""}
									</span>
								</th>
							))}
						</tr>
					))}
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
			</table> */}
		</div>
	);
};

export default RestaurantsTable;
