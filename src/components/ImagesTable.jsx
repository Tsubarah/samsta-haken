import { useMemo } from "react";
import { useSortBy, useTable } from "react-table";
import { useAuthContext } from "../contexts/AuthContext";

import placeholder from "../assets/images/placeholder-user-300x300.png";
import {
	TiArrowSortedDown,
	TiArrowSortedUp,
	TiArrowUnsorted,
} from "react-icons/ti";

const ImagesTable = ({ restaurants }) => {
	let newPhotos = [];

	restaurants.forEach((restaurant, i) => {
		if (restaurant.photos.length) {
			newPhotos.push(...restaurant.photos);
		}
	});

	console.log("newPhotos", newPhotos);

	const { updateRestaurantStatus } = useAuthContext();

	// const handleRestaurantStatus = (restaurantId, restaurant) => {
	// 	updateRestaurantStatus(restaurantId, restaurant);
	// };

	// Columns for user table
	// const columns = useMemo(
	// 	() => [
	// 		{
	// 			Header: "#",
	// 			accessor: "id",
	// 			disableSortBy: true,
	// 			Cell: (row) => {
	// 				return <span className="text-sm">{Number(row.row.id) + 1}</span>;
	// 			},
	// 		},
	// 		{
	// 			Header: "Profilbild",
	// 			accessor: "imageURL",
	// 			disableSortBy: true,
	// 			Cell: (row) => {
	// 				return (
	// 					<div className="avatar">
	// 						<div className="w-12 rounded-full">
	// 							{row.row.original.imageURL ? (
	// 								<img src={row.row.original.imageURL} />
	// 							) : (
	// 								<img src={placeholder} />
	// 							)}
	// 						</div>
	// 					</div>
	// 				);
	// 			},
	// 		},
	// 		{ Header: "Användare", accessor: "name" },
	// 		{ Header: "E-post", accessor: "email" },
	// 		{
	// 			Header: "Admin",
	// 			accessor: "admin",
	// 			Cell: (row) => {
	// 				return (
	// 					<>
	// 						{row.row.original.admin ? (
	// 							<button
	// 								// onClick={() =>
	// 								// 	handleUpdateAdmin(row.row.original.id, row.row.original)
	// 								// }
	// 								className="btn btn-success"
	// 							>
	// 								J
	// 							</button>
	// 						) : (
	// 							<button
	// 								// onClick={() =>
	// 								// 	handleUpdateAdmin(row.row.original.id, row.row.original)
	// 								// }
	// 								className="btn btn-error"
	// 							>
	// 								N
	// 							</button>
	// 						)}
	// 					</>
	// 				);
	// 			},
	// 		},
	// 	],
	// 	[]
	// );

	// React Table hook
	// const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
	// 	useTable({ columns, data: users }, useSortBy);

	return (
		<div className="overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-black">
			{/* <table {...getTableProps()} className="table table-zebra w-full">
				<thead className="sticky top-0 z-10">
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps(column.getSortByToggleProps())}>
									{column.render("Header")}
									<span>
										{column.isSorted ? (
											column.isSortedDesc ? (
												<TiArrowSortedDown size={20} />
											) : (
												<TiArrowSortedUp size={20} />
											)
										) : (
											<TiArrowUnsorted size={20} />
										)}
									</span>
								</th>
							))}
						</tr>
					))}
				</thead>

				<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table> */}
		</div>
	);
};

export default ImagesTable;
