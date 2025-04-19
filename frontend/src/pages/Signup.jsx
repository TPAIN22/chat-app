import { useState } from 'react'
import { Eye, EyeOff, Mail, User, UserIcon } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import Astronat from '../assets/Astronautas.jpeg'
import { useThemeStore } from '../store/useThemeStore'

const Signup = () => {
  const { theme } = useThemeStore()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  })
  const {isSigningUp , signup} = useAuthStore()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  const validatePassword = (password) => {
    return password.length >= 6;
  }
  const validateUserName = (name) => {
    return name.length >= 4;
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = { name: '', email: '', password: '' }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email';
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.name) {
      newErrors.name = ' Name is required';
    }

    setErrors(newErrors)

    if (!newErrors.name && !newErrors.email && !newErrors.password) {
      signup(formData)
    }
  }

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
      <h1 className="text-3xl font-bold text-center text-base-content">Regester</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Email Field */}
        <div className="relative">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <User className="text-base-content/20 absolute right-3 top-2" />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>
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
          disabled={isSigningUp}
          className="btn btn-primary w-full"
        >
          {isSigningUp ? "Logging in..." : "Register"}
        </button>
    
        <div className="text-center text-sm mt-4 text-base-content">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
    
    </div>
  )
}

export default Signup
