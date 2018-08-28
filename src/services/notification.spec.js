import { notification } from 'antd';
import Notification, { generateNotificationKey } from './notification';

describe('service: Notification', () => {
  describe('configuration', () => {
    it('should set defaults', () => {
      expect(notification.config).toHaveBeenCalled();
    });
  });

  describe('methods', () => {
    it('should have required methods', () => {
      expect(Object.keys(Notification)).toEqual(
        expect.arrayContaining([
          'open',
          'close',
          'destroy',
          'config',
          'success',
          'warning',
          'warn',
          'info',
          'error',
        ])
      );
    });

    describe('open', () => {
      it('should return the notification key', () => {
        const key = Notification.open();
        expect(typeof key).toBe('string');
      });

      it('should pass the key to notification', () => {
        const key = Notification.open();
        expect(notification.open).toHaveBeenCalledWith(expect.objectContaining({ key }));
      });
    });
  });

  describe('generateNotificationKey', () => {
    it('should generate a key', () => {
      const key = generateNotificationKey();
      expect(typeof key).toBe('string');
      expect(key).toMatch(/notif-\d+/);
    });
  });
});
