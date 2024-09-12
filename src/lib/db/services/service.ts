/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

import { app } from "../init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  return snapshot.data();
}

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
    role?: string;
  },
  // eslint-disable-next-line @typescript-eslint/ban-types
  callback: Function,
) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email),
  );
  const snapshot = await getDocs(q);

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    callback({ status: false, message: "Email already exist" });
  } else {
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "member";
    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callback({ status: true, message: "Register success" });
      })
      .catch((err) => {
        callback({ status: false, message: err.message });
      });
  }
}

export async function signIn(userData: { email: string }) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email),
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    return data[0];
  } else {
    return null;
  }
}

export async function postBlog(
  blogData: {
    title: string;
    content: string;
    imageURL: string;
    userId: string;
    createdAt: string;
    visibility: string;
  },
  // eslint-disable-next-line @typescript-eslint/ban-types
  callback: Function,
) {
  const docRef = await addDoc(collection(firestore, "blogs"), blogData)
    .then(() => {
      callback({ status: true, message: "Blog successfully added!" });
    })
    .catch((err) => {
      callback({ status: false, message: err.message });
    });
  return docRef;
}
