import { IconType } from "react-icons";
import { FaHeart, FaHome, FaPen, FaUser } from "react-icons/fa";

type SidebarItem = {
  name: string;
  icon: IconType;
  destination: string;
};

export const sidebarData: SidebarItem[] = [
  {
    name: "Dashboard",
    icon: FaHome,
    destination: "/dashboard",
  },

  {
    name: "My Blogs",
    icon: FaPen,
    destination: "/my-blogs",
  },
  {
    name: "Favorite",
    icon: FaHeart,
    destination: "/favorite",
  },
  {
    name: "Profile",
    icon: FaUser,
    destination: "/profile",
  },
];
