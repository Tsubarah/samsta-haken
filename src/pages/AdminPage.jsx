import { useAuthContext } from "../contexts/AuthContext";
import { db } from "../firebase/index";
import { doc, getDoc } from "firebase/firestore";

const AdminPage = () => {
  const { currentUser } = useAuthContext();

  //Get the user from the db
  const getUserdata = async () => {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const user = docSnap.data()
      console.log("tHIS IS USER: ", user)
      if(user.admin === true) {
          console.log("This user is an admin")
      } else {
          console.log("This user is NOT an admin");
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  //if there is a user, get userdata
  if(currentUser) {
    getUserdata();
  } 

  return (
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-3 gap-4 bg-gray-500 p-4 items-center">
        <div className="flex gap-4">
          <h1>Admin</h1>
          {currentUser && <p>{currentUser.email}</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
