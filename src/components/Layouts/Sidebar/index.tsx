/* eslint-disable @next/next/no-img-element */
import { signOut, useSession } from "next-auth/react";
import NavItem from "@/components/Elements/NavItem";
import { sidebarData } from "@/common/constant/sidebarData";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaSignOutAlt, FaBars } from "react-icons/fa";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/db/init";

const Sidebar = () => {
  const [idxActive, setIdxActive] = useState(0);
  const [profileImageURL, setProfileImageURL] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { push, pathname } = useRouter();
  const { data }: any = useSession();

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
  }, [pathname, data]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    push("/auth/login");
  };

  useEffect(() => {
    const idx = sidebarData.findIndex((item) => item.destination === pathname);
    setIdxActive(idx !== -1 ? idx : 0);
  }, [pathname]);

  return (
    <div>
      {/* Mobile */}
      <div className="w-full">
        <button
          className="md:hidden fixed top-0 left-0 p-4  w-full bg-white"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars className="text-2xl text-gray-700" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-full md:w-80 h-full bg-white border-r border-gray-200 md:relative md:flex md:flex-col md:justify-between md:max-w-xs z-50 ${
          isSidebarOpen ? "block" : "hidden md:block"
        }`}
      >
        <div className="h-screen flex flex-col">
          <div className="flex flex-col justify-center items-center mt-10">
            {profileImageURL ? (
              <div className="w-full h-32 flex justify-center items-center">
                <img
                  src={profileImageURL}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-32 flex justify-center items-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            )}

            <div className="p-5 flex flex-col items-center">
              <div>
                <p className="text-xl font-bold text-neutral-800 text-center">
                  {data && data.user.fullname}
                </p>
                <p className="text-md font-medium text-neutral-600 text-center">
                  {data && data.user.email}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col flex-grow">
            {sidebarData.map((item: any, index) => (
              <div key={index} onClick={() => setIsSidebarOpen(false)}>
                <NavItem
                  icon={<item.icon className="text-neutral-600 w-6 h-6 mr-2" />}
                  name={item.name}
                  destination={item.destination}
                  isActive={idxActive === index}
                />
              </div>
            ))}
          </div>

          <div className="w-full h-12 flex items-center px-5 mb-5">
            <button onClick={handleSignOut}>
              <div className="flex items-center gap-5 border p-3 rounded-lg bg-black text-white hover:opacity-75">
                <FaSignOutAlt />
                <p className="text-md font-medium">Sign out</p>
              </div>
            </button>
            <button
              className="md:hidden fixed top-0 left-0 m-4 z-100"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <FaBars className="text-2xl text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
