import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTable, useSortBy } from "react-table";

import {
	TiArrowSortedDown,
	TiArrowSortedUp,
	TiArrowUnsorted,
} from "react-icons/ti";
import { useAuthContext } from "../contexts/AuthContext";
import useDeleteRestaurant from "../hooks/useDeleteRestaurant";

const RestaurantsTable = ({ restaurants }) => {
	const { updateRestaurantStatus } = useAuthContext();

	const handleRestaurantStatus = (restaurantId, restaurant) => {
		updateRestaurantStatus(restaurantId, restaurant);
	};

	const { deleteRestaurant } = useDeleteRestaurant();

	// Columns for table
	const columns = useMemo(
		() => [
			{
				Header: "#",
				accessor: "id",
				disableSortBy: true,
				Cell: (row) => (
					<span className="text-sm">{Number(row.row.id) + 1}</span>
				),
			},
			{
				Header: "Namn",
				accessor: "name",
			},
			{ Header: "Adress", accessor: "address" },
			{ Header: "Stad", accessor: "city" },
			{
				Header: "Typ av kök",
				accessor: "cuisine",
			},
			{
				Header: "Typ av matställe",
				accessor: "type_of_place",
			},
			{
				Header: "Utbud",
				accessor: "offers_food",
			},
			{
				Header: "Hemsida",
				accessor: "website",
			},
			{
				Header: "E-post",
				accessor: "email",
			},
			{
				Header: "Tel",
				accessor: "tel",
			},
			{
				Header: "Facebook",
				accessor: "facebook",
			},
			{
				Header: "Instagram",
				accessor: "instagram",
			},
			{
				Header: "Redigera",
				disableSortBy: true,
				Cell: (row) => (
					<button
						className="btn btn-sm btn-info"
						onClick={() =>
							navigate(`/restaurants/${row.row.original.id}`)
						}
					>
						Redigera
					</button>
				),
			},
			{
				Header: "Radera",
				disableSortBy: true,
				Cell: (row) => (
					<button
						className="btn btn-error btn-sm"
						onClick={() => deleteRestaurant(row.row.original)}
					>
						Radera
					</button>
				),
			},
			{
				Header: "Godkänd",
				accessor: "accepted",
				Cell: (row) => (
					<>
						{row.row.original.accepted ? (
							<button
								className="btn btn-success btn-sm"
								onClick={() =>
									handleRestaurantStatus(
										row.row.original.id,
										row.row.original
									)
								}
							>
								J
							</button>
						) : (
							<button
								className="btn btn-error btn-sm"
								onClick={() =>
									handleRestaurantStatus(
										row.row.original.id,
										row.row.original
									)
								}
							>
								N
							</button>
						)}
					</>
				),
			},
		],
		[]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data: restaurants }, useSortBy);

	const navigate = useNavigate();

	return (
		<div className="overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-black">
			<table {...getTableProps()} className="table table-zebra w-full">
				<thead className="sticky top-0">
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th
									{...column.getHeaderProps(
										column.getSortByToggleProps()
									)}
								>
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
										<td {...cell.getCellProps()}>
											{cell.render("Cell")}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default RestaurantsTable;
