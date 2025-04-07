import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Mail, Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useAuthStore } from '../store/useAouthStore';
import { useNavigate } from 'react-router-dom';

function LogIn() {
  const { isLoginIn, login } = useAuthStore();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!formData.email || !formData.password) {
      alert('Please enter both email and password');
      return;
    }

    // Call the login function
    await login(formData);

    // After login, redirect to home page or dashboard
    navigate('/home'); // Replace with your desired route
  };

  return (
    <main className="flex items-center mx-auto h-screen px-10 gap-10 w-full">
      {/* Left side */}
      <div className="flex flex-col gap-6 w-full max-w-md items-center">
        <div className="flex flex-col items-center gap-2">
          <MessageSquare size={50} />
          <h1 className="text-2xl font-bold text-center">
            👌OnlyFriends👌
          </h1>
        </div>
        <p className="text-xs text-muted-foreground">
          welcome back 😉
        </p>
        <form onSubmit={handleSubmit} className="space-y-6 w-full">

          {/* Email */}
          <div className="form-control grid gap-2">
            <label
              htmlFor="email"
              className="text-sm px-2 font-semibold text-muted-foreground"
            >
              EMAIL
            </label>
            <div className="relative">
              <div className="absolute top-3 right-3">
                <Mail className="size-5" />
              </div>
              <input
                placeholder="abcd@example.com"
                type="email"
                name="email"
                id="email"
                className="w-full p-2 pr-10 rounded-md outline-none border border-muted-foreground"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control grid gap-2">
            <label
              htmlFor="password"
              className="text-sm px-2 font-semibold text-muted-foreground"
            >
              PASSWORD
            </label>
            <div className="relative">
              <button
                type="button"
                className="absolute top-4 right-2"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <Eye className="size-5" />
                ) : (
                  <EyeOff className="size-5" />
                )}
              </button>
              <input
                placeholder="************"
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                name="password"
                id="password"
                className="w-full p-2 pr-10 rounded-md outline-none border border-muted-foreground"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={isLoginIn}
            type="submit"
            className={`w-full py-2 rounded-md flex items-center justify-center transition duration-200 ease-in-out hover:cursor-pointer ${
              isLoginIn
                ? "btn btn-primary cursor-not-allowed"
                : "btn btn-primary text-primary-content"
            }`}
          >
            {isLoginIn ? (
              <LoaderCircle className="animate-spin size-5 " />
            ) : (
              " Log In"
            )}
          </button>
          <p className="text-center text-sm text-muted-foreground">
            Dont Have Account?
            <Link to="/SignUp" className="text-primary hover:text-accent">
              Sign up here
            </Link>
          </p>
        </form>
      </div>

      {/* Right side */}
      <div className="hidden md:block w-1/2">
        <img
          src="/images/signup.png" // Ensure the image path is correct
          alt="signup"
          className="w-full h-auto object-cover"
        />
      </div>
    </main>
  );
}

export default LogIn;
