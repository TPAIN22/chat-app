import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import Astronat from "../assets/Astronautas.jpeg";
import { useThemeStore } from "../store/useThemeStore";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const { login, isLogining } = useAuthStore();
  const { theme } = useThemeStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateEmail = (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = { email: "", password: "" };

    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    if (!newErrors.email && !newErrors.password) {
      login(formData);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-base-300 relative">
      {theme === "dark" && (
        <img
          src={Astronat}
          alt="Background"
          className="absolute w-full h-full object-cover blur-sm opacity-40"
        />
      )}
      <div className="relative z-10 rounded-2xl w-[90%] max-w-md p-8 bg-base-100/30 shadow-xl space-y-12">
  <h1 className="text-3xl font-bold text-center text-base-content">Login</h1>
  <form onSubmit={handleSubmit} className="space-y-8">
    {/* Email Field */}
    <div className="relative">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="input input-bordered w-full"
      />
      <Mail className="text-base-content/20 absolute right-3 top-2" />
      {errors.email && (
        <p className="text-xs text-red-500 mt-1">{errors.email}</p>
      )}
    </div>

    {/* Password Field */}
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="input input-bordered w-full"
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-3 top-2 text-muted-foreground"
      >
        {showPassword ? <EyeOff className="text-base-content/20" /> : <Eye className="text-base-content/20" />}
      </button>
      {errors.password && (
        <p className="text-xs text-red-500 mt-1">{errors.password}</p>
      )}
    </div>

    <button
      type="submit"
      disabled={isLogining}
      className="btn btn-primary w-full"
    >
      {isLogining ? "Logging in..." : "Login"}
    </button>

    <div className="text-center text-sm mt-4 text-base-content">
      Don’t have an account?{" "}
      <Link to="/signup" className="text-secondary hover:underline">
        Register
      </Link>
    </div>
  </form>
</div>

</div>
  );
};

export default Login;
