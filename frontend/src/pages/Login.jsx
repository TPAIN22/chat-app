import { useState } from 'react'
import { Eye, EyeOff, Mail } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
   
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({
   
    email: '',
    password: '',
  })
  const {login , isLogining} = useAuthStore()

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = { email: '', password: '' }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'invalid email';
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = 'password must be at least 6 characters';
    }

    if (!formData.name) {
      newErrors.name = 'enter your name';
    }

    setErrors(newErrors)
    if (!newErrors.email && !newErrors.password) {
      login(formData)
    }
  }

  return (
    <div className='bg-base rounded-2xl h-[90dvh] lg:mx-24 md:mt-8'>
      <div className='min-h-[calc(100vh-12rem)]  flex items-center'>
        {/* Left Side */}
        <div className='flex flex-col justify-center items-center p-6'>
          <div className='card w-full max-w-sm shadow-2xl rounded-lg'>
            <div className='card-body bg-base-300 space-y-4'>
              <h2 className='text-2xl font-semibold text-center text-base-content'>تسجيل الدخول</h2>

              <form onSubmit={handleSubmit} className='space-y-4'>
                 <div className='form-control'>
                  <label className='label'>
                    <span className='label-text text-sm text-base-content pb-2 pl-1'>Email</span>
                  </label>
                  <div className='relative'>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      placeholder='example@email.com'
                      className='input input-md input-bordered w-full rounded-lg'
                    />
                    <Mail size={18} className='absolute top-3 right-3 text-base-content/50'/>
                  </div>
                  {errors.email && <span className='text-red-500 text-sm'>{errors.email}</span>}
                </div>

                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text text-sm text-base-content pb-2 pl-1'>Password</span>
                  </label>
                  <div className='relative'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name='password'
                      value={formData.password}
                      onChange={handleChange}
                      placeholder='********'
                      className='input input-md input-bordered w-full pr-10 rounded-lg '
                    />
                    <button
                      type='button'
                      onClick={togglePasswordVisibility}
                      className='absolute top-3 right-3'
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} className='text-base-content/50' />}
                    </button>
                  </div>
                  {errors.password && <span className='text-red-500 text-sm'>{errors.password}</span>}
                </div>

                <div className='form-control mt-4'>
                  <button type='submit' className='btn btn-block btn-primary rounded-xl mt-5'>
                    Sign in
                  </button>
                </div>
              </form>
              <p className='text-xs text-base-content'>dont have account<span> <Link to="/signup" className='link text-primary'>Signup</Link></span> </p>
            </div>
            
          </div>

        </div>

        <div className='lg:flex hidden  items-center justify-center bg-violet-300 rounded-3xl max-w-[60%]'>
          <img
            src='https://illustrations.popsy.co/gray/work-from-home.svg'
            alt='Signup Illustration'
            className='w-2/3 max-w-sm'
          />
        </div>
      </div>
    </div>
  )
}

export default Login
