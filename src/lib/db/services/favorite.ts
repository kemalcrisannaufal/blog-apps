/* eslint-disable @typescript-eslint/ban-types */
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
const firestore = getFirestore(app);

interface Favorite {
  id: string;
  idBlog: string;
  idUser: string;
}

export async function isLiked(likeData: { idUser: string; idBlog: string }) {
  const q = query(
    collection(firestore, "favorites"),
    where("idUser", "==", likeData.idUser),
    where("idBlog", "==", likeData.idBlog)
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

export async function likeBlogs(
  likeData: {
    idUser: string;
    idBlog: string;
  },
  callback: Function
) {
  const data = await isLiked(likeData);

  if (data) {
    callback({ status: false, message: "Blog already liked" });
    return null;
  } else {
    const docRef = await addDoc(collection(firestore, "favorites"), likeData)
      .then(() => {
        callback({ status: true, message: "Success" });
      })
      .catch((err) => {
        callback({ status: false, message: err.message });
      });
    return docRef;
  }
}

export async function getFavoriteBlogs(idUser: string) {
  const q = query(
    collection(firestore, "favorites"),
    where("idUser", "==", idUser)
  );

  const snapshot = await getDocs(q);

  const favorites: Favorite[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Favorite, "id">),
  }));

  const blogsData = await Promise.all(
    favorites.map(async (favorite) => {
      const blogDocRef = doc(firestore, "blogs", favorite.idBlog);
      const blogDocSnapshot = await getDoc(blogDocRef);

      if (blogDocSnapshot.exists()) {
        return {
          id: blogDocSnapshot.id,
          ...blogDocSnapshot.data(),
        };
      } else {
        return null;
      }
    })
  );

  return blogsData;
}
