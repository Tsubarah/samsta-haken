import useGetCollection from "../hooks/useGetCollection";
import { useEffect, useState } from "react";
import UserTable from "../components/UserTable";
import useGetUser from "../hooks/useGetUser";
import RestaurantsTable from "../components/RestaurantsTable";

const AdminPage = () => {
	// const { user } = useGetUser();
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
	// console.log("User list: ", users)

	return (
		<div className="h-full flex flex-col">
			<div className="grid grid-cols-3 gap-4 bg-gray-500 p-4 items-center">
				<div className="flex gap-4">
					<h1>Admin</h1>
					{/* {user && <p>{user.email}</p>} */}
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
			{showRestaurantsTable && <RestaurantsTable restaurants={restaurants} />}
		</div>
	);
};

export default AdminPage;
