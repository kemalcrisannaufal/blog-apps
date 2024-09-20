import { useRouter } from "next/router";
import Sidebar from "../Sidebar";

const disabledNavbar = ["/auth/login", "/auth/register", "/404"];

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useRouter();
  return (
    <div className="flex">
      {!disabledNavbar.includes(pathname) && <Sidebar />}
      <div className={`flex-grow overflow-auto h-screen`}>{children}</div>
    </div>
  );
};

export default AppShell;
