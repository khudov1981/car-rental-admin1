import React, { useState, useCallback } from 'react';
import Notification from './Notification';
import './NotificationContainer.css';

const NotificationContainer = React.forwardRef((props, ref) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    const newNotification = { id, message, type, duration };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Автоматическое удаление уведомления после его отображения
    setTimeout(() => {
      removeNotification(id);
    }, duration + 300); // Добавляем немного времени для анимации
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  React.useImperativeHandle(ref, () => ({
    addNotification
  }));

  return (
    <div className="notification-container">
      {notifications.map(({ id, message, type, duration }) => (
        <Notification
          key={id}
          message={message}
          type={type}
          duration={duration}
          onClose={() => removeNotification(id)}
        />
      ))}
    </div>
  );
});

export default NotificationContainer;