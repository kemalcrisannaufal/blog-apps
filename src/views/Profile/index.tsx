/* eslint-disable @next/next/no-img-element */
import { useState, ChangeEvent, useEffect } from "react";
import { storage } from "../../lib/db/init";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSession } from "next-auth/react";
import HeaderPage from "@/components/Elements/HeaderPage";
import Button from "@/components/Elements/Button";
import { useRouter } from "next/router";

const ProfileView = () => {
  const { data }: any = useSession();
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState("");
  const [profileImageURL, setProfileImageURL] = useState("");
  const { reload } = useRouter();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (data.user?.id && image) {
      const storageRef = ref(storage, `profiles/${data.user.id}/profile.jpg`);
      await uploadBytesResumable(storageRef, image);

      const downloadURL = await getDownloadURL(storageRef);
      setImageURL(downloadURL);

      reload();
    }
  };

  useEffect(() => {
    if (data && data.user.id) {
      const profileImageRef = ref(
        storage,
        `profiles/${data.user.id}/profile.jpg`,
      );
      getDownloadURL(profileImageRef)
        .then((url) => {
          setProfileImageURL(url);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [data]);

  console.log(imageURL);

  return (
    <div className="w-full h-screen">
      <HeaderPage title="Profile" />
      <div className="px-10 mt-10 mb-5">
        <h1 className="text-2xl font-bold">
          Hello, {data && data.user.fullname}
        </h1>
        <p className="text-md text-neutral-600">{data && data.user.email}</p>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        {profileImageURL ? (
          <div className="w-full h-40 flex justify-center items-center">
            <img
              src={profileImageURL}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
        ) : (
          <div className="w-32 h-32 object-cover border border-neutral-300 rounded-full"></div>
        )}

        <div className="w-32 select-none border border-neutral-800 text-center mt-5">
          <label
            htmlFor="file"
            className="block cursor-pointer text-lg font-medium"
          >
            Choose File
          </label>
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="w-32 mt-5">
          <Button
            label="Upload Image"
            onClick={handleUpload}
            type="button"
            classname="text-sm w-32"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
