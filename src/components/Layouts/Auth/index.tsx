import FormLogin from "@/components/Fragments/Auth/FormLogin";
import FormRegister from "@/components/Fragments/Auth/FormRegister";
import Link from "next/link";

const AuthLayout = ({
  title,
  type,
}: {
  title: string;
  type: "login" | "register";
}) => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="sm:max-w-md w-full px-7 py-10 sm:border sm:border-neutral-200 sm:rounded-lg sm:shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-700">
          {title}
        </h1>
        <p className="text-sm md:text-md text-neutral-700 font-medium mt-2">
          Join us and start your journey
        </p>

        <div className="mt-5">
          {type === "register" ? (
            <FormRegister></FormRegister>
          ) : (
            <FormLogin></FormLogin>
          )}
        </div>

        <div className="mt-2 text-center">
          {type === "register" ? (
            <p className="text-sm md:text-md text-neutral-700">
              Already have an account?{" "}
              <Link href={"/auth/login"} className="text-sky-700 font-bold">
                Sign in
              </Link>
            </p>
          ) : (
            <p className="text-sm md:text-md text-neutral-700">
              Don&apos;t have an account?{" "}
              <Link href={"/auth/register"} className="text-sky-700 font-bold">
                Sign up
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
