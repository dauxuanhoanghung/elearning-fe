import background from "@/assets/bg.png";
import { LoginForm } from "@/components/auth";

const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center dark:bg-gray-900">
      <section className="relative hidden h-full md:block md:w-1/2 lg:w-2/3">
        <img src={background} className="h-full w-full object-cover" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform gap-2 text-center">
          <h1 className="text-6xl font-bold text-white">Welcome to Page</h1>
          <p className="text-2xl text-gray-300">
            Login to have the best experiments.
          </p>
        </div>
      </section>
      <section className="w-full md:w-1/2 lg:w-1/3">
        <LoginForm />
      </section>
    </div>
  );
};

export default Login;
