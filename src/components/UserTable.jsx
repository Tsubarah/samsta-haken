import { useAuthContext } from "../contexts/AuthContext";

const UserTable = ({ users }) => {
	console.log(users);

	const { updateAdmin } = useAuthContext();

	const handleUpdateAdmin = (e) => {
		updateAdmin(e.target.id);
	};

	return (
		<div className="overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-black">
			<table className="table table-zebra w-full">
				{/* <!-- head --> */}
				<thead>
					<tr>
						<th></th>
						<th>Image</th>
						<th>Email</th>
						<th>Admin</th>
					</tr>
				</thead>
				<tbody>
					{users &&
						users.map((user) => (
							<tr key={user.id}>
								<th>1</th>
								<td>Null</td>
								<td>{user.email}</td>
								<td>
									{user.admin ? (
										<button
											id={user.id}
											onClick={handleUpdateAdmin}
											className="btn btn-success"
										>
											J
										</button>
									) : (
										<button
											id={user.id}
											onClick={handleUpdateAdmin}
											className="btn btn-error"
										>
											N
										</button>
									)}
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default UserTable;
