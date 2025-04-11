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
    // التأكد من أن كلمة المرور تحتوي على 6 أحرف على الأقل
    return password.length >= 6;
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = { name: '', email: '', password: '' }

    // التحقق من صحة الإيميل
    if (!validateEmail(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صالح';
    }

    // التحقق من صحة كلمة المرور
    if (!validatePassword(formData.password)) {
      newErrors.password = 'كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل';
    }

    // التحقق من الاسم
    if (!formData.name) {
      newErrors.name = 'الاسم مطلوب';
    }

    setErrors(newErrors)

    // إذا كانت جميع الحقول صحيحة، يمكن إرسال البيانات
    if (!newErrors.name && !newErrors.email && !newErrors.password) {
      signup(formData)
      // هنا يمكنك إضافة الكود الخاص بمعالجة التسجيل
    }
  }

  return (
    <div className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 h-screen'>
      <div className='min-h-[calc(100vh-6rem)] grid lg:grid-cols-2'>
        {/* Left Side */}
        <div className='flex flex-col justify-center items-center p-6'>
          <div className='card w-full max-w-sm shadow-2xl bg-white rounded-lg'>
            <div className='card-body space-y-4'>
              <h2 className='text-3xl font-semibold text-center text-gray-800'>إنشاء حساب</h2>

              {/* Start Form */}
              <form onSubmit={handleSubmit} className='space-y-4'>
                {/* الاسم */}
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text text-sm text-gray-600 pb-2 pl-1 '>الاسم</span>
                  </label>
                  <div className='relative'>
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      placeholder='ادخل اسمك'
                      className='input input-md input-bordered w-full pr-10 rounded-lg outline-non'
                    />
                    <UserIcon size={18} className='absolute top-3 right-3 text-indigo-600' />
                  </div>
                  {errors.name && <span className='text-red-500 text-sm'>{errors.name}</span>}
                </div>

                {/* الإيميل */}
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text text-sm text-gray-600 pb-2 pl-1'>البريد الإلكتروني</span>
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
                    <Mail size={18} className='absolute top-3 right-3 text-indigo-600' />
                  </div>
                  {errors.email && <span className='text-red-500 text-sm'>{errors.email}</span>}
                </div>

                {/* كلمة المرور */}
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text text-sm text-gray-600 pb-2 pl-1'>كلمة المرور</span>
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

                {/* زر التسجيل */}
                <div className='form-control mt-4'>
                  <button type='submit' className='btn btn-md bg-primary text-primary-content  rounded-lg shadow-lg w-full hover:bg-secondary'
                  disabled={isSigningup}>
                    {
                      isSigningup ? <span className='loading loading-spinner text-white'></span> : <span>تسجيل</span> }
                  </button>
                </div>
              </form>
              {/* End Form */}
              <p className='text-xs text-base-content'>already have account? <span> <Link to="/login" >Sign in</Link></span> </p>
            </div>
            
          </div>

        </div>

        {/* Right Side */}
        <div className='lg:flex items-center justify-center bg-white'>
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
