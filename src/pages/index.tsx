import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const InitialPage = () => {
  const { push } = useRouter();
  const { data } = useSession();

  useEffect(() => {
    if (data?.user) {
      push("/dashboard");
    } else {
      push("/auth/login");
    }
  }, [data, push]);

  return null; // Tidak perlu merender apapun karena hanya redirect
};

export default InitialPage;
