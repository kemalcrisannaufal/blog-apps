import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../init";
const firestore = getFirestore(app);

export async function retrieveBlogs(visibility: string) {
  const q = query(
    collection(firestore, "blogs"),
    where("visibility", "==", visibility),
  );
  const snapshot = await getDocs(q);

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retriveBlogsByUserId(visibility: string, userId: string) {
  const q = query(
    collection(firestore, "blogs"),
    where("userId", "==", userId),
    where("visibility", "==", visibility),
  );

  const snapshot = await getDocs(q);
  console.log(snapshot.docs);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}
