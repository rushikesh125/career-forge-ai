"use client"
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import Link from 'next/link';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import CustomBtn from '@/components/CustomBtn';
import { createUser } from '@/firebase/users/write';

const SignupPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading,setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Name is required';
        } else if (value.length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        } else {
          delete newErrors.name;
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          newErrors.email = 'Email is required';
        } else if (!emailRegex.test(value)) {
          newErrors.email = 'Please enter a valid email';
        } else {
          delete newErrors.email;
        }
        break;

      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (value.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        } else {
          delete newErrors.password;
        }
        // Validate confirm password if it exists
        if (formData.confirmPassword) {
          if (value !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
          } else {
            delete newErrors.confirmPassword;
          }
        }
        break;

      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (value !== formData.password) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const touchedAll = Object.fromEntries(
      Object.keys(touched).map(key => [key, true])
    );
    setTouched(touchedAll);

    const isValid = Object.keys(formData).every(
      field => validateField(field, formData[field])
    );

    if (isValid) {
      // console.log('Form submitted:', formData);
      // Add your signup logic here
      setIsLoading(true)
      try {
        const credential = await createUserWithEmailAndPassword(auth,formData.email,formData.password)
        await updateProfile(credential.user, {
          displayName: formData.name,
        });
        const user = {
          displayName: formData.name,
          email: credential.user.email,
          photoURL: credential.user.photoURL,
          uid: credential.user.uid,
        };
        // console.log("credential:", user);
        await createUser({ uid: user?.uid, user: user });
        toast.success("successful registration")
        router.push(`/dashboard`)
      } catch (err) {
        console.log('error::',err);
        toast.error(err?.message)
      }finally{
        setIsLoading(false)
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent mb-2">
              Create Account
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sign up to get started with our service
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div className="space-y-1">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg
                    bg-white dark:bg-gray-700 
                    text-gray-900 dark:text-white 
                    placeholder-gray-500 dark:placeholder-gray-400
                    ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                    focus:ring-2 focus:ring-purple-500 outline-none`}
                  placeholder="Full name"
                />
              </div>
              {touched.name && errors.name && (
                <p className="text-sm text-red-500 ml-1">{errors.name}</p>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg
                    bg-white dark:bg-gray-700 
                    text-gray-900 dark:text-white 
                    placeholder-gray-500 dark:placeholder-gray-400
                    ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                    focus:ring-2 focus:ring-purple-500 outline-none`}
                  placeholder="Email address"
                />
              </div>
              {touched.email && errors.email && (
                <p className="text-sm text-red-500 ml-1">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-12 py-2 border rounded-lg
                    bg-white dark:bg-gray-700 
                    text-gray-900 dark:text-white 
                    placeholder-gray-500 dark:placeholder-gray-400
                    ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                    focus:ring-2 focus:ring-purple-500 outline-none`}
                  placeholder="Create password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="text-sm text-red-500 ml-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-1">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-12 py-2 border rounded-lg
                    bg-white dark:bg-gray-700 
                    text-gray-900 dark:text-white 
                    placeholder-gray-500 dark:placeholder-gray-400
                    ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                    focus:ring-2 focus:ring-purple-500 outline-none`}
                  placeholder="Confirm password"
                />
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-sm text-red-500 ml-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <CustomBtn
            isLoading={isLoading}
              type="submit"
              className="w-full py-2 px-4 mt-6 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 
                text-white rounded-lg hover:opacity-90 transform hover:scale-[1.02] transition-all"
            >
              Create Account
            </CustomBtn>
              <hr/>
            {/* Sign In Link */}
            <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
              Already have an account?{' '}
              <Link href={`/login`} className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;