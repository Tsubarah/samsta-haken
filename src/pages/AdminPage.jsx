import useGetCollection from "../hooks/useGetCollection";
import { useEffect, useState } from "react";
import UserTable from "../components/UserTable";
import useGetDocument from "../hooks/useGetDocument";
import { useAuthContext } from "../contexts/AuthContext";

const AdminPage = () => {
  const { currentUser } = useAuthContext();
  console.log(currentUser)
  let userList;

  if (currentUser) {
    const { data: user } = useGetDocument("users", currentUser.uid);
    console.log("User: ", user);

    const { data: users } = useGetCollection("users");
    userList = users
  }

  return (
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-3 gap-4 bg-gray-500 p-4 items-center">
        <div className="flex gap-4">
          <h1>Admin</h1>
          {/* {user && <p>{user.email}</p>} */}
        </div>
      </div>
      {userList && <UserTable user={userList} />}
    </div>
  );
};

export default AdminPage;
