import { Link } from "react-router-dom";
import { MessageSquare, User, Mail, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/useAouthStore";
import { toast } from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const validation = () => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    )
      return toast.error("All Fields Are Required");
    if (formData.password.length < 6)
      return toast.error("This Is Gay Password");
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email))
      return toast.error("Gay email address");
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = validation();
    if (res === true) signup(formData);
  };
  return (
    <main className="flex items-center mx-auto h-screen px-10 gap-10 w-full">
      {/* left side */}
      <div className="flex flex-col gap-6 w-full max-w-md items-center">
        <div className="flex flex-col items-center gap-2">
          <MessageSquare size={50} />
          <h1 className="text-2xl font-bold text-center">
            Welcome
          </h1>
        </div>
        <p className="text-xs text-muted-foreground">
          If You Dont Create An Acount You Are Gay 😉
        </p>
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          {/* Name */}
          <div className="form-control grid gap-2">
            <label
              htmlFor="name"
              className="text-sm px-2 font-semibold text-muted-foreground"
            >
              NAME
            </label>
            <div className="relative">
              <div className="absolute top-3 right-3">
                <User className="size-5" />
              </div>
              <input
                placeholder="John Doe"
                type="text"
                name="name"
                id="name"
                value={formData.name}
                className="w-full p-2 pr-10 rounded-md outline-none border border-muted-foreground"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>

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
            disabled={isSigningUp}
            type="submit"
            className={`w-full py-2 rounded-md flex items-center justify-center transition duration-200 ease-in-out hover:cursor-pointer ${
              isSigningUp
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-300 text-white"
            }`}
          >
            {isSigningUp ? (
              <LoaderCircle className="animate-spin size-5 " />
            ) : (
              " Create Account"
            )}
          </button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              Login here
            </Link>
          </p>
        </form>
      </div>

      {/* right side */}
      <div className="hidden md:block w-1/2">
        <img
          src="/images/signup.png" // تأكد من المسار الصحيح
          alt="signup"
          className="w-full h-auto object-cover"
        />
      </div>
    </main>
  );
};

export default SignUp;
