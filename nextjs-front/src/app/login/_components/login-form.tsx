"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Login, loginValidator } from "@/lib/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function LoginForm() {
  const {
    register,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(loginValidator),
  });

  return (
    <form className="mt-6 flex flex-col gap-4 w-full  sm:max-w-[50%]">
      <Input type="text" placeholder="Username" {...register("username")} />
      {errors.username && (
        <p className="text-red-500 text-xs">{errors.username.message}</p>
      )}
      <Input type="password" placeholder="Password" {...register("password")} />
      {errors.password && (
        <p className="text-red-500 text-xs">{errors.password.message}</p>
      )}
      <Button type="submit">Login</Button>
    </form>
  );
}

export { LoginForm };
