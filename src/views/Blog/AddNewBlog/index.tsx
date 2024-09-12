/* eslint-disable @typescript-eslint/no-unused-vars */
import HeaderPage from "@/components/Elements/HeaderPage";
import Button from "@/components/Elements/Button";
import { ChangeEvent, useState } from "react";
import { storage, db } from "@/lib/db/init";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/router";

const AddNewBlogView = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState("");
  const { push } = useRouter();
  const { data }: any = useSession();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async (): Promise<string> => {
    if (data.user?.id && image) {
      return new Promise<string>((resolve, reject) => {
        const storageRef = ref(storage, `blogs/${data.user.id}/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.error("Upload failed:", error);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              setImageURL(downloadURL);
              resolve(downloadURL);
            } catch (error) {
              console.error(error);
              reject(error);
            }
          },
        );
      });
    }
    throw new Error("No user ID or image provided");
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const uploadedImageURL = await handleUpload();
      const payloadData = {
        title: event.target.title.value,
        image: uploadedImageURL,
        content: event.target.content.value,
        visibility: event.target.visibility.value,
        userId: data.user.id,
        createdAt: new Date().toISOString(),
      };

      const result = await fetch("/api/blogs/postBlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadData),
      });

      if (result.status === 200) {
        event.target.reset();
        setImage(null);
        setImageURL("");
        push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <HeaderPage title="Add New Blog" />
      <div className="w-full h-full p-10 pt-5 flex flex-col">
        <form onSubmit={handleSubmit}>
          <div className="my-3 w-full">
            <label
              htmlFor="title"
              className="block text-sm sm:text-md md:text-lg font-bold tracking-wide"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              className="w-full border px-2 py-3 rounded-lg mt-2"
            />
          </div>

          <div className="mb-3 w-full">
            <p className="block text-sm sm:text-md md:text-lg font-bold tracking-wide">
              Image
            </p>
            <div className="w-full border rounded-lg mt-2 flex items-center">
              <div className="h-full border-r px-2 py-3">
                <label
                  htmlFor="file"
                  className="text-md tracking-wide cursor-pointer"
                >
                  Choose File
                </label>
              </div>
              <div className="h-full px-2 py-3">
                <p>{image ? image.name : ""}</p>
              </div>
              <input
                type="file"
                name="file"
                id="file"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="mb-3 w-full">
            <label
              htmlFor="visibility"
              className="block text-sm sm:text-md md:text-lg font-bold tracking-wide"
            >
              Visibility
            </label>
            <select
              name="visibility"
              id="visibility"
              className="w-full border px-2 py-3 rounded-lg mt-2"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div className="mb-3 w-full">
            <label
              htmlFor="title"
              className="block text-sm sm:text-md md:text-lg font-bold tracking-wide"
            >
              Content
            </label>
            <textarea
              name="content"
              id="content"
              rows={20}
              className="w-full border p-2 rounded-lg mt-2"
            />
          </div>

          <div>
            <Button
              type="submit"
              label="Submit"
              onClick={() => {}}
              classname="text-sm md:text-lg"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewBlogView;
