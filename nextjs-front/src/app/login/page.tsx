import { LoginForm } from "./_components/login-form";

function LoginPage() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-2xl">Login</h1>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
