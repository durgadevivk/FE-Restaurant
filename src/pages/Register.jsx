import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { toast } from "react-toastify";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer"
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await registerUser(formData);

            toast.success(response.message || "Registration successful");

            navigate("/login");

        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Registration failed";

            toast.error(errorMessage);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

            <div className="max-w-md w-full space-y-8">

                {/* Header */}
                <div>
                    <Link
                        to="/"
                        className="flex items-center justify-center"
                    >
                        <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">
                                RR
                            </span>
                        </div>
                    </Link>

                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>

                    <p className="mt-2 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-orange-600 hover:text-orange-500"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>

                {/* Form */}
                <form
                    className="mt-8 space-y-6"
                    onSubmit={handleRegister}
                >

                    <div className="space-y-4">

                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Full Name
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email Address
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="new-password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label
                                htmlFor="role"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Account Type
                            </label>

                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            >
                                <option value="user">
                                    user
                                </option>

                                <option value="restaurant_owner">
                                    Restaurant Owner
                                </option>
                            </select>
                        </div>

                    </div>

                    {/* Register Button */}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            Create Account
                        </button>
                    </div>

                </form>

                {/* Back Home */}
                <div className="text-center">
                    <Link
                        to="/"
                        className="text-sm text-orange-600 hover:text-orange-500"
                    >
                        Back to Home
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Register;