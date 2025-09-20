"use client";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2Icon, Loader } from "lucide-react";
import Link from "next/link";
import GoogleIcon from "@/components/icons/GoogleIcon";
import toast from "react-hot-toast";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import CustomBtn from "@/components/CustomBtn";
import { createUser } from "@/firebase/users/write";
import { Button } from "@/components/ui/button";
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Login attempt:', formData);
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("Login Success");
      router.push("/dashboard");
    } catch (error) {
      console.log("Error:::", error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    // console.log('Login attempt:', formData);
    setIsLoading(true);
    try {
      const res = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = {
        displayName: res.user?.displayName,
        email: res.user?.email,
        photoURL: res.user?.photoURL,
        uid: res.user?.uid,
      };
      await createUser({ uid: user?.uid, user: user });
      toast.success("Login Success");
      router.push("/dashboard");
    } catch (error) {
      console.log("Error:::", error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent mb-2">
              Welcome Back!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to continue your journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Email Input */}
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                    bg-white dark:bg-gray-700 
                    text-gray-900 dark:text-white 
                    placeholder-gray-500 dark:placeholder-gray-400
                    focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Email address"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-10 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                    bg-white dark:bg-gray-700 
                    text-gray-900 dark:text-white 
                    placeholder-gray-500 dark:placeholder-gray-400
                    focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 
                text-white rounded-lg hover:opacity-90 transform hover:scale-[1.02] transition-all"
            >
              {isLoading ? <Loader2Icon className="animate-spin" /> : ""}
              {isLoading ? "Signing in...." : "Sign In"}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex">
              <Button
                disabled={isLoading}
                type="button"
                onClick={handleGoogleSignin}
                className="w-full text-white flex items-center justify-center py-2 px-4 
                  border border-gray-300 dark:border-gray-600 
                   dark:text-gray-200
                  rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700 
                  transition-colors"
              >
                {isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  <GoogleIcon />
                )}
                {isLoading ? "Signing In..." : "Sign in with Google"}
                {/* &nbsp; */}
              </Button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                href={`/register`}
                className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
