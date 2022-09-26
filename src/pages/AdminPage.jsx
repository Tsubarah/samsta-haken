import { useState } from "react";
import useGetCollection from "../hooks/useGetCollection";
import { useAuthContext } from "../contexts/AuthContext";
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

	const { currentUser } = useAuthContext();

	const { data: users } = useGetCollection("users");
	const { data: restaurants } = useGetCollection("restaurants");

	return (
		<div className="h-full flex flex-col overflow-hidden">
			<div className="flex justify-center gap-4 py-4">
				<h1 className="text-xl">
					Välkommen till admin-sidan: {""}
					<span className="font-semibold">
						{currentUser.displayName
							? currentUser.displayName
							: currentUser.email}
					</span>
				</h1>
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
