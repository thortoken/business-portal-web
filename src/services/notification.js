import { notification } from 'antd';

// Defaults
notification.config({
  placement: 'topRight',
  duration: 3,
});

export const generateNotificationKey = () => `notif-${+new Date()}`;

const openAndReturnKey = args => {
  const key = generateNotificationKey();
  notification.open({ ...args, key });
  return key;
};

const NotificationService = {
  config: notification.config,
  open: openAndReturnKey,
  close: notification.close,
  destroy: notification.destroy,
};

['success', 'warning', 'info', 'error'].forEach(type => {
  NotificationService[type] = args => openAndReturnKey({ ...args, type });
});

NotificationService.warn = NotificationService.warning;

export default NotificationService;
