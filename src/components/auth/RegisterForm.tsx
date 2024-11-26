import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Trophy } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store/Store";
import { registers } from "@/store/features/authSlice";
import { Link, useNavigate } from "react-router-dom";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

export function RegisterForm() {
  const { isLoading, error, isLogin } = useSelector((state: any) => state.auth);
  console.log(error);

  console.log(isLoading);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data: any) => {
    console.log(data);
    dispatch(registers(data));

    if (isLogin) {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <Trophy className="h-12 w-12 text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">
            Create an account
          </h2>
          <p className="text-gray-500 mt-2">Join our sports community</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              {...register("name", { required: "Full Name is required" })}
              className="mt-1"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
            {error?.length > 0 &&
              error.map((item: any, index: number) =>
                item.path === "name" ? (
                  <p className="text-red-500 text-sm mt-1" key={index}>
                    {item.msg}
                  </p>
                ) : null
              )}
          </div>

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
                pattern: /^[^@]+@[^@]+\.[^@]+$/,
              })}
              className="mt-1"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
            {error?.length > 0 &&
              error.map((item: any, index: number) =>
                item.path === "email" ? (
                  <p className="text-red-500 text-sm mt-1" key={index}>
                    {item.msg}
                  </p>
                ) : null
              )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <Input
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              {...register("phone", {
                required: "Phone number is required",
                pattern:
                  /^[+]*[0-9]{1,3}[ -]?[0-9]{1,4}[ -]?[0-9]{1,4}[ -]?[0-9]{1,4}$/i,
              })}
              className="mt-1"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone.message}</p>
            )}
            {error?.length > 0 &&
              error.map((item: any, index: number) =>
                item.path === "phone" ? (
                  <p className="text-red-500 text-sm mt-1" key={index}>
                    {item.msg}
                  </p>
                ) : null
              )}
          </div>

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
                  message: "Password must be at least 6 characters",
                },
              })}
              className="mt-1"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
            {error?.length > 0 &&
              error.map((item: any, index: number) =>
                item.path === "password" ? (
                  <p className="text-red-500 text-sm mt-1" key={index}>
                    {item.msg}
                  </p>
                ) : null
              )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="mt-1"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}

            {error?.length > 0 &&
              error.map((item: any, index: number) =>
                item.path === "confirmPassword" ? (
                  <p className="text-red-500 text-sm mt-1" key={index}>
                    {item.msg}
                  </p>
                ) : null
              )}
          </div>

          {isLoading ? (
            <Button className="w-full flex items-center justify-center">
              <div className="relative w-6 h-6">
                <div className="w-6 h-6 rounded-full absolute border-2 border-solid border-gray-200"></div>
                <div className="w-6 h-6 rounded-full animate-spin absolute border-2 border-solid border-indigo-600 border-t-transparent"></div>
              </div>
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full flex items-center justify-center"
            >
              Create Account
            </Button>
          )}

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
