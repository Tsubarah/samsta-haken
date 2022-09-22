import { useAuthContext } from "../contexts/AuthContext";

const UserTable = ({ users }) => {
	const { updateAdmin } = useAuthContext();

	const handleUpdateAdmin = (userId, user) => {
		updateAdmin(userId, user);
	};

	return (
		<div className="overflow-x-auto">
			<table className="table w-full">
				{/* <!-- head --> */}
				<thead>
					<tr>
						<th></th>
						<th>Id</th>
						<th>Email</th>
						<th>Admin</th>
					</tr>
				</thead>
				<tbody>
					{users &&
						users.map((user, i) => (
							<tr key={user.id}>
								<th>{i + 1}</th>
								<td>{user.id}</td>
								<td>{user.email}</td>
								<td>
									{user.admin ? (
										<button
											onClick={() => handleUpdateAdmin(user.id, user)}
											className="btn btn-success"
										>
											J
										</button>
									) : (
										<button
											onClick={() => handleUpdateAdmin(user.id, user)}
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
