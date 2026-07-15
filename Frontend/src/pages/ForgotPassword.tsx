import { Link } from "react-router-dom";

function ForgotPassword() {

  return (

    <div className="min-h-screen bg-[#F8F3ED] flex items-center justify-center px-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10">

        <p className="uppercase tracking-[4px] text-[#8B6B52] font-semibold text-center">
          Password Recovery
        </p>

        <div className="flex items-center justify-center gap-3 my-4">
          <div className="w-16 h-[2px] bg-[#C69C6D]"></div>
          <div className="w-2 h-2 rounded-full bg-[#C69C6D]"></div>
          <div className="w-16 h-[2px] bg-[#C69C6D]"></div>
        </div>

        <h2 className="text-4xl font-bold text-center text-[#3E2723]">
          Forgot Password
        </h2>

        <p className="text-center text-gray-500 mt-4 mb-8">
          Enter your registered email address and we'll send you a password reset link.
        </p>

        <form>

          <label className="block text-[#3E2723] font-medium mb-2">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-[#D8C3A5] rounded-lg px-4 py-3 mb-6 focus:outline-none focus:border-[#6F4E37] focus:ring-2 focus:ring-[#E8D1B8]"
          />

          <button
            type="submit"
            className="w-full bg-[#5C4033] hover:bg-[#4A3227] text-white py-3 rounded-lg font-semibold transition duration-300"
          >
            Send Reset Link
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-[#5C4033] font-bold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default ForgotPassword;