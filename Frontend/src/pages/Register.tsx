import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";


function Register() {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            alert("Registration Successful");

            navigate("/login");

        } catch (error) {
            alert("Registration Failed");
            console.log(error);
        }
    };

    return (

        <div className="min-h-screen bg-[#F2E2CE] flex items-center justify-center px-4">

            <div className="bg-[#FFF9F2] w-full max-w-md rounded-2xl shadow-2xl p-8">


                <h1 className="text-4xl font-bold text-center text-[#5C4033]">
                    Blog Platform
                </h1>

                <p className="uppercase tracking-[4px] mt-3 text-[#8B6B52] font-semibold text-center">
                    Create Account
                </p>

                <div className="flex items-center justify-center gap-3 my-4">
                    <div className="w-16 h-[2px] bg-[#C69C6D]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#C69C6D]"></div>
                    <div className="w-16 h-[2px] bg-[#C69C6D]"></div>
                </div>

                <h2 className="text-4xl font-bold text-center text-[#3E2723]">
                    Register
                </h2>

                <p className="text-center text-gray-500 mt-4 mb-8">
                    Create your account to start sharing amazing stories.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <label className="block mb-2 font-medium text-[#3E2723]">
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full border border-[#D8C3A5] rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-[#6F4E37] focus:ring-2 focus:ring-[#E8D1B8]"
                    />

                    <label className="block mb-2 font-medium text-[#3E2723]">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full border border-[#D8C3A5] rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-[#6F4E37] focus:ring-2 focus:ring-[#8B5E3C]"
                    />

                    <label className="block mb-2 font-medium text-[#3E2723]">
                        Password
                    </label>


                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full border border-[#D8C3A5] rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-[#6F4E37] focus:ring-2 focus:ring-[#8B5E3C]"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 inset-y-0 flex items-center text-gray-500"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <label className="block mb-2 font-medium text-[#3E2723]">Confirm Password</label>

                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className="w-full border border-[#D8C3A5] rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-[#6F4E37] focus:ring-2 focus:ring-[#8B5E3C]"
                        />

                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 inset-y-0 flex items-center text-gray-500"
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <button
                        className="w-full bg-[#5C4033] hover:bg-[#4A3227] transition duration-300 text-white py-3 rounded-lg font-semibold shadow-md">
                        Register
                    </button>
                </form>

                <p className="text-center mt-5 text-gray-600">
                    Already have an account?

                    <Link
                        to="/login"
                        className="text-[#5C4033] font-bold ml-2 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;