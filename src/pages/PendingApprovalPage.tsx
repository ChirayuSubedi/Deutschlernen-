import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Clock } from 'lucide-react';

export default function PendingApprovalPage() {
  const user = useAuthStore((state) => state.user);

  if (user?.status !== 'pending') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-lg text-center">
        <Clock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Approval Pending</h1>
        <p className="text-gray-600 mb-6">
          Your account is currently pending admin approval. You'll receive access to the courses once your account is approved.
        </p>
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600">
            Please check back later or contact support if you have any questions.
          </p>
        </div>
      </div>
    </div>
  );
}