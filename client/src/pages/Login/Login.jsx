import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../../services/api";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success(data.message);

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-[85vh] flex justify-center items-center bg-gray-100">

      <form
        onSubmit={submitHandler}
        className="bg-white shadow-xl rounded-xl p-8 w-[450px]"
      >

        <h1 className="text-4xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to continue shopping.
        </p>

        <label className="font-semibold">
          Email Address
        </label>

        <input
          type="email"
          placeholder="Example: manasa@gmail.com"
          className="w-full border rounded-lg p-3 mt-2 mb-5"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="font-semibold">
          Password
        </label>

        <div className="relative mt-2">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full border rounded-lg p-3 pr-16"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-blue-600 text-sm"
          >
            {showPassword ? "Hide" : "Show"}
          </button>

        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mt-8 text-lg font-semibold"
        >
          Login
        </button>

        <p className="text-center mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Login;