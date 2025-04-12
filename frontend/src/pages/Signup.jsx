import { useState } from 'react'
import { Eye, EyeOff, Mail, UserIcon } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'

const Signup = () => {
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
  const {isSigningup , signup} = useAuthStore()

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
    <div className='bg-base-300 rounded-2xl lg:mx-24 md:mt-8'>
      <div className='min-h-[calc(100vh-12rem)] bg-base-100 rounded-3xl flex w-full'>
        {/* Left Side */}
        <div className='flex flex-col justify-center items-center rounded-2xl p-6 w-full'>
          <div className='card w-full max-w-sm shadow-2xl rounded-lg'>
            <div className='card-body bg-base-300 space-y-4 rounded-2xl'>
              <h2 className='text-2xl font-semibold text-center text-base-content'>Sign Up</h2>

              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text text-sm text-gray-600 pb-2 pl-1 '>Name</span>
                  </label>
                  <div className='relative'>
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      placeholder='name'
                      className='input input-md input-bordered w-full pr-10 rounded-lg outline-non'
                    />
                    <UserIcon size={18} className='absolute top-3 right-3 text-base-content/50' />
                  </div>
                  {errors.name && <span className='text-red-500 text-sm'>{errors.name}</span>}
                </div>

                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text text-sm text-gray-600 pb-2 pl-1'>Email</span>
                  </label>
                  <div className='relative'>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      placeholder='example@email.com'
                      className='input input-md input-bordered w-full pr-10 rounded-lg outline-non'
                    />
                    <Mail size={18} className='absolute top-3 right-3 text-base-content/50' />
                  </div>
                  {errors.email && <span className='text-red-500 text-sm'>{errors.email}</span>}
                </div>

                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text text-sm text-gray-600 pb-2 pl-1'>Password</span>
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
                      className='absolute top-3 right-3 text-gray-600'
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <span className='text-red-500 text-sm'>{errors.password}</span>}
                </div>

                <div className='form-control mt-4'>
                  <button type='submit' className='btn btn-md bg-primary text-primary-content rounded-lg shadow-lg w-full hover:bg-primary/20'
                  disabled={isSigningup}>
                    {
                      isSigningup ? <span className='loading loading-spinner text-base-content'></span> : <span>Sign up</span> }
                  </button>
                </div>
              </form>
              <p className='text-xs text-base-content'>already have account? <span> <Link to="/login" >Sign in</Link></span> </p>
            </div>
            
          </div>

        </div>

        <div className='lg:flex items-center justify-center bg-base-content rounded-2xl p-6 w-full'>
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

export default Signup
