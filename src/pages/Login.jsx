import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, getCurrentUser } from "../services/authService";
import { setUser } from "../redux/authSlice";
import { toast } from "react-toastify";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

   const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await loginUser(formData);

        toast.success(response.message || "Login successful");

        // Get logged-in user from backend
        const userResponse = await getCurrentUser();

        const user = userResponse.user;

        // Store user in Redux
        dispatch(setUser(user));

        console.log("Logged in user:", user);
        console.log("Role:", user.role);

        // Navigate based on role
        if (user.role === "admin") {
            navigate("/admin-dashboard");
        } else if (user.role === "restaurant_owner") {
            navigate("/owner-dashboard");
        } else {
            navigate("/dashboard");
        }

    } catch (error) {
        const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Login failed";

        toast.error(errorMessage);
    }
};
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">

                <div>
                    <Link to="/" className="flex items-center justify-center space-x-2">
                        <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">
                                RR
                            </span>
                        </div>
                    </Link>

                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>

                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{" "}
                        <Link
                            to="/register"
                            className="font-medium text-orange-600 hover:text-orange-500"
                        >
                            create a new account
                        </Link>
                    </p>
                </div>

                <form
                    className="mt-8 space-y-6"
                    onSubmit={handleLogin}
                >
                    <div className="rounded-md shadow-sm -space-y-px">

                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>

                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value
                                    })
                                }
                            />
                        </div>

                    </div>

                    <div className="flex items-center justify-end">
                        <div className="text-sm">
                            <Link
                                to="/forgot-password"
                                className="font-medium text-orange-600 hover:text-orange-500"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
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

export default Login;