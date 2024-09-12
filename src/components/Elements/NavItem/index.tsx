import Link from "next/link";

const NavItem = ({
  name,
  destination,
  icon,
  isActive,
}: {
  name: string;
  destination: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}) => {
  return (
    <Link href={destination}>
      <div
        className={`w-full pl-8 py-5 h-14 flex justify-between items-center ${
          isActive && "bg-neutral-100"
        }`}
      >
        <div className="w-[40px] flex justify-start items-center">{icon}</div>
        <div className="flex-grow">
          <p className="text-neutral-600 text-md font-medium">{name}</p>
        </div>

        <div
          className={`h-14 w-[5px] bg-black ${isActive ? "block" : "hidden"}`}
        ></div>
      </div>
    </Link>
  );
};

export default NavItem;
