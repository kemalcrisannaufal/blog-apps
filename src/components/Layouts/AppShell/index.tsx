import { useRouter } from "next/router";
import Sidebar from "../Sidebar";

const disabledNavbar = ["/auth/login", "/auth/register"];

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useRouter();
  return (
    <div className="w-full min-h-screen flex">
      {!disabledNavbar.includes(pathname) && <Sidebar />}
      {!disabledNavbar.includes(pathname) ? (
        <div className={`w-full`}>{children}</div>
      ) : (
        children
      )}
    </div>
  );
};

export default AppShell;
