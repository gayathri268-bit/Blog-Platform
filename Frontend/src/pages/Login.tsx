import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";


function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            const response = await loginUser(formData);

            console.log(response);

            localStorage.setItem("token", response.token);
            localStorage.setItem("user", 
            JSON.stringify(response.user));
            
            alert("Login Successful");

            navigate("/");

        } catch (error) {
            alert("Invalid Email or Password");
            console.log(error);
        }
    };

    return (

        <div className="min-h-screen bg-white flex items-center justify-center px-6">

            <div className="bg-white rounded-3xl border border-[#5C4033] shadow-2xl w-full max-w-md mb-20 p-10">

                <p className="uppercase tracking-[4px] text-[#8B6B52] font-semibold text-center">
                    Welcome Back
                </p>

                <div className="flex items-center justify-center gap-3 my-4">
                    <div className="w-16 h-[2px] bg-[#C69C6D]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#C69C6D]"></div>
                    <div className="w-16 h-[2px] bg-[#C69C6D]"></div>
                </div>

                <h2 className="text-4xl font-bold text-center text-[#3E2723]">
                    Login
                </h2>

                <p className="text-center text-gray-500 mt-4">
                    Login to continue your blogging journey.
                </p>
        
                <form onSubmit={handleLogin}>

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your Email"
                        className="w-full border border-[#D8C3A5] rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-[#6F4E37] focus:ring-2 focus:ring-[#E8D1B8]"
                    />

                    <label className="block text-[#3E2723] font-medium mb-2">Password</label>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your Password"
                            className="w-full border border-[#D8C3A5] rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-[#6F4E37] focus:ring-2 focus:ring-[#E8D1B8]"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 inset-y-0 flex items-center text-gray-500">


                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}

                        </button>

                    </div>

                    <div className="flex justify-end mb-5">
                        <Link
                            to="/forgot-password"
                            className="text-sm text-[#5C4033] hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#5C4033] hover:bg-[#4A3227] text-white py-3 rounded-lg font-semibold">
                        Login
                    </button>
                </form>


                <p className="text-center mt-5 text-gray-600">
                    Don't have an account? {" "}
                    <Link
                        to="/register"
                        className="text-[#5C4033] font-semibold hover:underline">
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;