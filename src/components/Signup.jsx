import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Logo, Input, Button } from "./index.js";
import authService from "../appwrite/auth.js";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";

const Signup = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { register, handleSubmit } = useForm();
   const [error, setError] = useState("");
   const signup = async ({ email, password, name }) => {
      setError("");
      try {
         const session = await authService.createAccount({
            email,
            password,
            name,
         });
         if (session) {
            const userData = await authService.getUserInfo();
            if (userData) {
               dispatch(login(userData));
               navigate("/");
            }
         }
      } catch (error) {
         setError(error.message);
         throw error;
      }
   };
   return (
      <div className="flex items-center justify-center ">
         <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border-black/10">
            <div className="mb-2 flex justify-center">
               <span className="inline-block w-full max-w-[100px]">
                  <Logo width="100%" />
               </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">
               Create a new account
            </h2>
            <p className="mt-2 text-center text-base text-black/60">
               Already have an account?
               <Link
                  to="/login"
                  className="font-medium text-primary transition-all duration-200 hover:underline"
               >
                  Sign In
               </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center"> {error}</p>}

            <form onSubmit={handleSubmit(signup)}>
               <div className="space-y-5">
                  <Input
                     label="Full Name"
                     placeholder="Enter your full name"
                     {...register("name", { required: true })}
                  />
                  <Input
                     label="Email: "
                     placeholder="Enter your email"
                     type="email"
                     {...register("email", {
                        required: true,
                        validate: {
                           matchPattern: (value) =>
                              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                              "Invalid email format, try again",
                        },
                     })}
                  />
                  <Input
                     label="Password: "
                     placeholder="Enter your password"
                     type="password"
                     {...register("password", { required: true })}
                  />
                  <Button type="submit" className="w-full">
                     Sign Up
                  </Button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Signup;
