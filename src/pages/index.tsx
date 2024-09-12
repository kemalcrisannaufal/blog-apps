import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const InitialPage = () => {
  const { push } = useRouter();
  const { data } = useSession();

  return <>{data?.user ? push("/dashboard") : push("/auth/login")}</>;
};

export default InitialPage;
