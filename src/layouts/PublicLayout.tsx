import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRoadmap } from '../context/RoadmapContext';

export const PublicLayout: React.FC = () => {
  const { isAuthenticated, isGuest, authLoading } = useRoadmap();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (isAuthenticated && !isGuest) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
