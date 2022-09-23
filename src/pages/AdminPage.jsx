import useGetCollection from "../hooks/useGetCollection";
import { useMemo, useState } from "react";
import UserTable from "../components/UserTable";
import RestaurantsTable from "../components/RestaurantsTable";

const AdminPage = () => {
	const [showUsersTable, setShowUsersTable] = useState(false);
	const [showRestaurantsTable, setShowRestaurantsTable] = useState(false);

	const handleShowUsersTable = () => {
		setShowUsersTable(!showUsersTable);
	};
	const handleShowRestaurantsTable = () => {
		setShowRestaurantsTable(!showRestaurantsTable);
	};

	const { data: users } = useGetCollection("users");
	const { data: restaurants } = useGetCollection("restaurants");

	console.log(restaurants);

	const restaurantsColumns = useMemo(() => {
		return [
			{
				Header: "Namn",
				accessor: "name",
			},
			{
				Header: "Adress",
				accessor: "address",
			},
			{
				Header: "Stad",
				accessor: "city",
			},
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
		];
	}, []);

	return (
		<div className="h-full flex flex-col overflow-hidden">
			<div className="grid grid-cols-3 gap-4 bg-gray-500 p-4 items-center">
				<div className="flex gap-4">
					<h1>Admin</h1>
				</div>
			</div>

			<button
				className="btn btn-block btn-primary btn-sm"
				onClick={handleShowUsersTable}
			>
				Användare
			</button>
			{showUsersTable && <UserTable users={users} />}

			<div className="divider"></div>

			<button
				className="btn btn-block btn-primary btn-sm"
				onClick={handleShowRestaurantsTable}
			>
				Restauranger
			</button>
			{showRestaurantsTable && (
				<RestaurantsTable
					restaurants={restaurants}
					restaurantsColumns={restaurantsColumns}
				/>
			)}
		</div>
	);
};

export default AdminPage;
