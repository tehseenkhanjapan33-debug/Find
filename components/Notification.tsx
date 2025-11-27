
import React, { useEffect } from 'react';
import { useAppContext } from '../hooks/useAppContext';

const Notification: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { notifications } = state;

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload: notifications[0].id });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications, dispatch]);
  
  if (notifications.length === 0) return null;

  const notification = notifications[0];
  
  const baseClasses = "fixed top-20 right-5 z-50 p-4 rounded-md shadow-lg text-sm font-medium transition-transform transform";
  const typeClasses = {
      success: "bg-green-50 text-green-700",
      error: "bg-red-50 text-red-700",
      info: "bg-blue-50 text-blue-700"
  };

  return (
    <div className={`${baseClasses} ${typeClasses[notification.type]}`}
        onClick={() => dispatch({ type: 'REMOVE_NOTIFICATION', payload: notification.id })}>
      {notification.message}
    </div>
  );
};

export default Notification;
