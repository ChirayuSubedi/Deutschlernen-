import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Features from './components/Features';
import { SignupForm } from './components/auth/SignupForm';
import { LoginForm } from './components/auth/LoginForm';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LessonPage from './pages/LessonPage';
import PracticePage from './pages/PracticePage';
import CommunityPage from './pages/CommunityPage';
import { Quiz } from './components/exercises/Quiz';
import { Pronunciation } from './components/exercises/Pronunciation';
import { ProgressChart } from './components/dashboard/ProgressChart';
import { LeaderboardCard } from './components/dashboard/LeaderboardCard';
import { UserProfile } from './components/dashboard/UserProfile';
import { ProtectedRoute } from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import PendingApprovalPage from './pages/PendingApprovalPage';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<main><Hero /><Features /></main>} />
            <Route path="/courses" element={
              <ProtectedRoute>
                {user?.role === 'student' ? (
                  <CoursesPage />
                ) : (
                  <Navigate to="/pending-approval" replace />
                )}
              </ProtectedRoute>
            } />
            <Route path="/course/:courseId" element={
              <ProtectedRoute>
                {user?.role === 'student' ? (
                  <CourseDetailPage />
                ) : (
                  <Navigate to="/pending-approval" replace />
                )}
              </ProtectedRoute>
            } />
            <Route path="/lesson/:courseId/:moduleId/:lessonId" element={
              <ProtectedRoute>
                {user?.role === 'student' ? (
                  <LessonPage />
                ) : (
                  <Navigate to="/pending-approval" replace />
                )}
              </ProtectedRoute>
            } />
            <Route path="/practice" element={
              <ProtectedRoute>
                {user?.role === 'student' ? (
                  <PracticePage />
                ) : (
                  <Navigate to="/pending-approval" replace />
                )}
              </ProtectedRoute>
            } />
            <Route path="/community" element={
              <ProtectedRoute>
                <CommunityPage />
              </ProtectedRoute>
            } />
            <Route path="/signup" element={<main className="max-w-7xl mx-auto px-4 py-16"><SignupForm /></main>} />
            <Route path="/login" element={<main className="max-w-7xl mx-auto px-4 py-16"><LoginForm /></main>} />
            <Route path="/pending-approval" element={<PendingApprovalPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
                  <UserProfile />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ProgressChart />
                    <LeaderboardCard />
                  </div>
                </main>
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;