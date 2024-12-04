import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useCourseStore } from '../store/useCourseStore';
import { Plus, Trash2, Edit2, UserCheck, BookOpen } from 'lucide-react';
import { courseContent } from '../data/courseContent';

export default function AdminDashboard() {
  const { user, users, createUser, deleteUser, updateUserRole, enrollUserInCourse } = useAuthStore();
  const { getActiveLearnersCount } = useCourseStore();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
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
  });

  // Only allow access if user is admin
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
          <p className="mt-2 text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    createUser(newUserData);
    setShowCreateForm(false);
    setNewUserData({
      name: '',
      email: '',
      role: 'student',
      level: 'A1',
      points: 0,
      enrolledCourses: [],
      completedCourses: [],
      progress: {
        grammar: 0,
        vocabulary: 0,
        pronunciation: 0,
        practice: 0
      }
    });
  };

  const handleEnrollUser = (courseId: string) => {
    if (selectedUserId) {
      const course = courseContent[courseId as keyof typeof courseContent];
      if (course) {
        enrollUserInCourse(selectedUserId, courseId, course.title);
      }
      setShowEnrollForm(false);
      setSelectedUserId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create User
            </button>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-gray-700">Total Users</h3>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-gray-700">Active Students</h3>
              <p className="text-2xl font-bold">
                {users.filter(u => u.role === 'student').length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-gray-700">Admin Users</h3>
              <p className="text-2xl font-bold">
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
          </div>
        </div>

        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Create New User</h2>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={newUserData.name}
                    onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={newUserData.email}
                    onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    value={newUserData.role}
                    onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value as 'student' | 'admin' })}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Level</label>
                  <select
                    value={newUserData.level}
                    onChange={(e) => setNewUserData({ ...newUserData, level: e.target.value as 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' })}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="A1">A1 - Beginner</option>
                    <option value="A2">A2 - Elementary</option>
                    <option value="B1">B1 - Intermediate</option>
                    <option value="B2">B2 - Upper Intermediate</option>
                    <option value="C1">C1 - Advanced</option>
                    <option value="C2">C2 - Mastery</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showEnrollForm && selectedUserId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Enroll User in Course</h2>
              <div className="space-y-4">
                {Object.entries(courseContent).map(([courseId, course]) => (
                  <button
                    key={courseId}
                    onClick={() => handleEnrollUser(courseId)}
                    className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-semibold">{course.title}</h3>
                      <p className="text-sm text-gray-600">{course.description}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {getActiveLearnersCount(courseId)} learners
                    </span>
                  </button>
                ))}
                <button
                  onClick={() => {
                    setShowEnrollForm(false);
                    setSelectedUserId(null);
                  }}
                  className="w-full px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrolled Courses
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.level}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {user.enrolledCourses?.length || 0} courses
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          setSelectedUserId(user.id);
                          setShowEnrollForm(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="Enroll in Course"
                      >
                        <BookOpen className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => updateUserRole(user.id, user.role === 'admin' ? 'student' : 'admin')}
                        className="text-blue-600 hover:text-blue-900"
                        title="Toggle Role"
                      >
                        <UserCheck className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete User"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}