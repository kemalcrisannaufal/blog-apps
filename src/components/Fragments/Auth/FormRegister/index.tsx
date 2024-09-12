import AuthInput from "@/components/Elements/AuthInput";
import Button from "@/components/Elements/Button";
import { useRouter } from "next/router";
import { useState } from "react";

const FormRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    const data = {
      email: event.target.email.value,
      fullname: event.target.fullname.value,
      password: event.target.password.value,
    };

    if (data.email === "" || data.fullname === "" || data.password === "") {
      setIsLoading(false);
      setError("Please fill in all fields");
      return;
    }

    const result = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      event.target.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError(
        result.status === 400 ? "Email already exist" : "Something went wrong",
      );
    }
  };

  return (
    <div className="w-full">
      {error && <p className="text-red-500 text-sm font-bold mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <AuthInput
          name="fullname"
          type="text"
          placeholder="full name"
          label="Full name"
        />

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
            label={isLoading ? "Loading..." : "Register"}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
