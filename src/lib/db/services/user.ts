import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../init";

const firestore = getFirestore(app);

export async function retrieveUserFullname(userId: string) {
  try {
    const snapshot = await getDoc(doc(firestore, "users", userId));
    if (snapshot) {
      const data = snapshot.data();

      return { fullname: data?.fullname || null };
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
