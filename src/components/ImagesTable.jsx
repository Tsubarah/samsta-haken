import { useMemo } from "react";
import { useSortBy, useTable } from "react-table";
import { useAuthContext } from "../contexts/AuthContext";

import placeholder from "../assets/images/placeholder-user-300x300.png";
import {
	TiArrowSortedDown,
	TiArrowSortedUp,
	TiArrowUnsorted,
} from "react-icons/ti";
import { useEffect } from "react";
import { useState } from "react";

const ImagesTable = ({ restaurants }) => {
	let filteredRestaurants = [];

	//* Iterates thru all objects and collects all photos into one array
	restaurants.forEach((restaurant) => {
		if (restaurant.photos.length) {
			return filteredRestaurants.push(...restaurant.photos);
		}
	});

	// console.log("filteredRestaurants", filteredRestaurants);

	const { updateRestaurantStatus } = useAuthContext();

	// const handleRestaurantStatus = (restaurantId, restaurant) => {
	// 	updateRestaurantStatus(restaurantId, restaurant);
	// };

	// Columns for user table
	const columns = useMemo(
		() => [
			{
				Header: "#",
				accessor: "id",
				disableSortBy: true,
				Cell: (row) => {
					return <span className="text-sm">{Number(row.row.id) + 1}</span>;
				},
			},
			{
				Header: "Bild",
				accessor: "url",
				disableSortBy: true,
				Cell: (row) => {
					console.log(row.row.original.photos);

					return (
						<div className="avatar">
							<div className="w-24 rounded">
								{row.row.original.photos.length >= 0 &&
									row.row.original.photos.map((photo) => (
										<img src={photo.url} />
									))}
							</div>
						</div>
					);
				},
			},
			{ Header: "Restaurang", accessor: "uploaded_by_user" },
			{ Header: "Uppladdat av", accessor: "uploaded_by_user" },
			{
				Header: "Godkänd",
				accessor: "accepted",
				Cell: (row) => {
					return (
						<>
							{row.row.original.photos.accepted ? (
								<button
									// onClick={() =>
									// 	handleUpdateAdmin(row.row.original.id, row.row.original)
									// }
									className="btn btn-success"
								>
									J
								</button>
							) : (
								<button
									// onClick={() =>
									// 	handleUpdateAdmin(row.row.original.id, row.row.original)
									// }
									className="btn btn-error"
								>
									N
								</button>
							)}
						</>
					);
				},
			},
		],
		[]
	);

	// React Table hook
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data: restaurants }, useSortBy);

	return (
		<div className="overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-black">
			<table {...getTableProps()} className="table table-zebra w-full">
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
			</table>
		</div>
	);
};

export default ImagesTable;
