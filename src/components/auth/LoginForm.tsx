import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useCourseStore } from '../../store/useCourseStore';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

// Admin credentials
const ADMIN_EMAIL = 'admin@deutschlernen.com';
const ADMIN_PASSWORD = 'admin123';

export const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  const enrollUserInCourse = useCourseStore((state) => state.enrollUserInCourse);
  
  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data: LoginFormData) => {
    const userId = Math.random().toString(36).substr(2, 9);
    
    // Check if admin login
    if (data.email === ADMIN_EMAIL && data.password === ADMIN_PASSWORD) {
      const adminUser = {
        id: userId,
        name: 'Admin User',
        email: data.email,
        role: 'admin' as const,
        level: 'C2' as const,
        points: 0,
        enrolledCourses: [],
        completedCourses: [],
        progress: {
          grammar: 0,
          vocabulary: 0,
          pronunciation: 0,
          practice: 0
        }
      };
      login(adminUser);
      navigate('/admin');
      return;
    }

    // Regular user login (simulated)
    const mockUser = {
      id: userId,
      name: 'Student User',
      email: data.email,
      role: 'student' as const,
      level: 'A1' as const,
      points: 0,
      enrolledCourses: [],
      completedCourses: [],
      progress: {
        grammar: 0,
        vocabulary: 0,
        pronunciation: 0,
        practice: 0
      }
    };
    
    login(mockUser);
    enrollUserInCourse(userId, 'a1-basics');
    
    // Redirect to the page they tried to access, or dashboard if none
    const from = location.state?.from?.pathname || '/dashboard';
    navigate(from, { replace: true });
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            {...register('email')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            {...register('password')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="password"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign In
        </button>

        {/* Admin login hint */}
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Admin Login:</p>
          <p>Email: admin@deutschlernen.com</p>
          <p>Password: admin123</p>
        </div>
      </form>
    </div>
  );
};