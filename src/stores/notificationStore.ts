import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';

const DEFAULTS = {
   duration: 4000,
   kind: 'info' as INotification['kind'],
   stay: false,
   onClick: () => void 0
};

export interface INotification {
   kind: 'error' | 'warning' | 'info' | 'success';
   text: string;
   stay?: boolean;
   duration?: number;
   onClick?: () => void;
}

export interface Notification extends INotification {
   id: string;
   createdAt: number;
}

export const useNotificationStore = defineStore({
   id: 'notificationStore',
   state: () => ({
      notifications: [] as Notification[]
   }),
   actions: {
      createNotification(notification: INotification): void {
         this.notifications.push({
            createdAt: Date.now(),
            text: notification.text,
            kind: notification.kind || DEFAULTS.kind,
            duration: notification.duration || DEFAULTS.duration,
            onClick: notification.onClick || DEFAULTS.onClick,
            stay: notification.stay || DEFAULTS.stay,
            id: nanoid()
         });
      },
      deleteNotification(id: Notification['id']) {
         const index = this.notifications.findIndex(n => {
            return n.id === id;
         });
         this.notifications.splice(index, 1);
      }
   }
});