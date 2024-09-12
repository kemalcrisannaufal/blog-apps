import AuthInput from "@/components/Elements/AuthInput";
import Button from "@/components/Elements/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const FormLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/dashboard";
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl,
      });
      console.log(res);
      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Invalid email or password");
      }
    } catch (error: any) {
      setIsLoading(false);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="w-full">
      {error && <p className="text-red-500 text-sm font-bold mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <AuthInput
          name="email"
          type="email"
          placeholder="email"
          label="Email"
        />

        <AuthInput
          name="password"
          type="password"
          placeholder="password"
          label="Password"
        />

        <div className="mt-5">
          <Button
            type="submit"
            onClick={() => {}}
            label={isLoading ? "Loading..." : "Login"}
          />
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
