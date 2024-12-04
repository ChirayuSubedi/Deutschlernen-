import React from 'react';
import { Trophy, Medal, Star } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useLeaderboardStore } from '../../store/useLeaderboardStore';

export const LeaderboardCard = () => {
  const user = useAuthStore((state) => state.user);
  const { leaderboard, getUserRank } = useLeaderboardStore();
  const userRank = user ? getUserRank(user.id) : null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Top Learners</h3>
        <Trophy className="text-yellow-500 w-6 h-6" />
      </div>

      {user && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-blue-600">#{userRank}</span>
              <div>
                <p className="font-semibold">{user.name} (You)</p>
                <p className="text-sm text-gray-600">Level {user.level}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold">{user.points}</span>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {leaderboard.map((entry, index) => (
          <div
            key={entry.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <span className={`font-semibold ${
                index === 0 ? 'text-yellow-500' :
                index === 1 ? 'text-gray-500' :
                index === 2 ? 'text-orange-500' : 'text-gray-600'
              }`}>#{index + 1}</span>
              <div>
                <p className="font-medium">{entry.name}</p>
                <p className="text-sm text-gray-600">Level {entry.level}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Medal className="w-4 h-4 text-blue-600" />
              <span className="font-semibold">{entry.points}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};