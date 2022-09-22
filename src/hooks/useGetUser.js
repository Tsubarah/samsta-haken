import { useAuthContext } from "../contexts/AuthContext";
import { db } from "../firebase/index";
import { doc, getDoc } from "firebase/firestore";

const useGetUser = async () => {
  const { currentUser } = useAuthContext();
  //Get the user from the db

  if (currentUser) {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const user = docSnap.data();

      user.admin
        ? console.log("This user is an admin")
        : console.log("This user is NOT an admin");
        
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  return user;
};

export default useGetUser;
