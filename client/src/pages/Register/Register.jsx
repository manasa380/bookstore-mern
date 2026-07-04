import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../../services/api";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/register", formData);

      toast.success(data.message);

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
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
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Join BookStore and start exploring amazing books.
        </p>

        {/* Name */}

        <label className="font-semibold">
          Full Name
        </label>

        <input
          type="text"
          name="name"
          placeholder="Example: Manasa Dubbaka"
          value={formData.name}
          onChange={changeHandler}
          className="w-full border rounded-lg p-3 mt-2 mb-1"
          required
        />

        <p className="text-sm text-gray-500 mb-4">
          Enter your full name.
        </p>

        {/* Email */}

        <label className="font-semibold">
          Email Address
        </label>

        <input
          type="email"
          name="email"
          placeholder="Example: manasa@gmail.com"
          value={formData.email}
          onChange={changeHandler}
          className="w-full border rounded-lg p-3 mt-2 mb-1"
          required
        />

        <p className="text-sm text-gray-500 mb-4">
          We'll never share your email.
        </p>

        {/* Password */}

        <label className="font-semibold">
          Password
        </label>

        <div className="relative mt-2">

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Minimum 6 characters"
            value={formData.password}
            onChange={changeHandler}
            className="w-full border rounded-lg p-3 pr-16"
            minLength={6}
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

        <p className="text-sm text-gray-500 mb-4">
          Password should contain at least 6 characters.
        </p>

        {/* Phone */}

        <label className="font-semibold">
          Phone Number
        </label>

        <input
          type="tel"
          name="phone"
          placeholder="Example: 9876543210"
          value={formData.phone}
          onChange={changeHandler}
          className="w-full border rounded-lg p-3 mt-2 mb-1"
          pattern="[0-9]{10}"
          required
        />

        <p className="text-sm text-gray-500 mb-6">
          Enter a valid 10-digit mobile number.
        </p>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold"
        >
          Register
        </button>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;