import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Navbar = () => {
  const { push } = useRouter();
  const handleLogOut = async () => {
    await signOut({ redirect: false });
    push("/auth/login");
  };

  return (
    <>
      <div className="w-full h-20 px-10 bg-black text-white flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">DiaryVerse</h1>
        </div>
        <div>
          <button onClick={handleLogOut}>Sign out</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
