import { Link, useNavigate } from "react-router-dom";
import { FaCoffee } from "react-icons/fa";

function Navbar() {


    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user") || "null");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert("Logged out successfully");

        navigate("/login");
    };
    return (

        <nav className="bg-gradient-to-r from-[#3E2723] via-[#4A2C2A] to-[#6F4E37] text-white shadow-lg">

            <div className="max-w-7xl mx-auto h-24 flex items-center px-10">

                <div className="w-1/4 flex items-center absolute left-8 gap-3">

                    <FaCoffee className="text-4xl text-[#E8D1B8]" />

                    <Link to="/" className="leading-tight">

                        <h1
                            className="text-3xl text-[#FFF8F0]"
                            style={{ fontFamily: "'Pacifico', cursive" }}
                        >
                            Coffee Tales
                        </h1>

                        <p className="text-[10px] font-bold tracking-[0.35em] mt-2 uppercase text-[#E8D1B8]">
                            Blog Platform
                        </p>

                    </Link>

                </div>

                <div className=" flex justify-center items-center gap-8 flex-1 font-bold">

                    <Link to="/" className="hover:text-[#F3E3CF]">Home</Link>

                    <Link to="/blogs" className="hover:text-[#F3E3CF]">Blogs</Link>

                    <Link to="/create-blog" className="hover:text-[#F3E3CF]">
                        Create Blog
                    </Link>

                    {user && (
                        <>
                            <Link to="/drafts" className="hover:text-[#E8D1B8]">
                                Drafts
                            </Link>

                            <Link to="/analytics" className="hover:text-[#E8D1B8]">
                                Analytics
                            </Link>

                            <Link to="/profile" className="hover:text-[#E8D1B8]">
                                Profile
                            </Link>
                        </>
                    )}

                </div>

            {user ? (
              <div className="flex items-center ml-auto absolute right-8 gap-4">
               <Link
                  to="/profile"
                  className="w-10 h-10 rounded-full bg-white text-[#8B5E3C] border border-[#3E2723] flex items-center justify-center font-bold text-lg hover:scale-105 transition"
                >
                   G
              </Link>

              <button
                onClick={handleLogout}
                className="bg-[#8B5E3C] text-white px-4 py-2 rounded-lg hover:bg-[#6F472B] transition"
            >
              Logout
              </button>
           </div>

        ) : (     
              <div className="flex gap-4">

                            <Link
                                to="/login"
                                className="hover:text-[#F3E3CF]"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="bg-[#F3E3CF] text-[#5C4033] px-5 rounded-lg font-semibold"
                            >
                                Register
                            </Link>

                        </div>
                    )}

                </div>

        </nav>
    );
}
    export default Navbar;