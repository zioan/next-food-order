import { createContext, useEffect, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // After 3 seconds hide success message
    const timeId = setTimeout(() => {
      setShowNotification(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [showNotification]);

  function notificationHandler() {
    setShowNotification(true);
  }

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        notificationHandler,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
