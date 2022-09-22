import useGetCollection from "../hooks/useGetCollection";
import { useEffect } from "react";
import UserTable from "../components/UserTable";
import useGetUser from "../hooks/useGetUser";

const AdminPage = () => {
	// const { user } = useGetUser();

	const { data: users } = useGetCollection("users");
	// console.log("User list: ", users)

	return (
		<div className="h-full flex flex-col">
			<div className="grid grid-cols-3 gap-4 bg-gray-500 p-4 items-center">
				<div className="flex gap-4">
					<h1>Admin</h1>
					{/* {user && <p>{user.email}</p>} */}
				</div>
			</div>
			<UserTable users={users} />
		</div>
	);
};

export default AdminPage;
