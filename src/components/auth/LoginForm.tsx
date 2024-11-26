import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Trophy } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store/Store";
import { login } from "@/store/features/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface IFormInput {
  email: string;
  password: string;
}

export function LoginForm() {
  const { isLoading, error, isLogin } = useSelector((state: any) => state.auth);
  console.log(error);
  const navigate = useNavigate();
  console.log(isLoading);
  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data: any) => {
    dispatch(login(data));
    if (isLogin) {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <Trophy className="h-12 w-12 text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        {error && (
          <div className="w-full mx-auto bg-white">
            <div
              className="mt-5 flex items-center justify-between p-3 leading-normal text-red-600 bg-red-100 rounded-lg"
              role="alert"
            >
              <div className="flex items-center">
                <p>{error}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="mt-1"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="mt-1"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </a>
            </div>
          </div>

          {isLoading ? (
            <Button className="w-full flex items-center justify-center">
              <div className="relative w-6 h-6">
                <div className="w-6 h-6 rounded-full absolute border-2 border-solid border-gray-200"></div>
                <div className="w-6 h-6 rounded-full animate-spin absolute border-2 border-solid border-indigo-600 border-t-transparent"></div>
              </div>
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          )}

          {/* Redirect to Sign Up */}
          <p className="text-center text-sm text-gray-500">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
