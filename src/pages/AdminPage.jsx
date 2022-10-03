import { useState } from "react";
import useGetCollection from "../hooks/useGetCollection";
import { useAuthContext } from "../contexts/AuthContext";
import UserTable from "../components/UserTable";
import RestaurantsTable from "../components/RestaurantsTable";
import ImageGrid from "../components/ImageGrid";

const AdminPage = () => {
	const [showUsersTable, setShowUsersTable] = useState(false);
	const [showRestaurantsTable, setShowRestaurantsTable] = useState(false);
	const [showImageGrid, setShowImageGrid] = useState(false);

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
				onClick={() => setShowUsersTable(!showUsersTable)}
			>
				Användare
			</button>
			{showUsersTable && <UserTable users={users} />}

			<div className="divider"></div>

			<button
				className="btn btn-block btn-primary btn-sm"
				onClick={() => setShowRestaurantsTable(!showRestaurantsTable)}
			>
				Restauranger
			</button>
			{showRestaurantsTable && <RestaurantsTable restaurants={restaurants} />}

			<div className="divider"></div>

			<button
				className="btn btn-block btn-primary btn-sm"
				onClick={() => setShowImageGrid(!showImageGrid)}
			>
				Ej godkända bilder
			</button>
			{showImageGrid && <ImageGrid />}
		</div>
	);
};

export default AdminPage;
