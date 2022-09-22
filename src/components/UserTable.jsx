const UserTable = ({ users }) => {
	console.log(users);

	return (
		<div className="overflow-x-auto">
			<table className="table w-full">
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
										<button className="btn btn-success">J</button>
									) : (
										<button className="btn btn-error">N</button>
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
