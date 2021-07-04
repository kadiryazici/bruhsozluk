import { useNotificationStore } from '/src/stores/notificationStore';

type ArrayChildren = () => any;
const functions: ArrayChildren[] = [];

export function OnAppMounted() {
   registerFunction(() => {
      const notification = useNotificationStore();
      window.addEventListener('online', () => {
         notification.createNotification({
            kind: 'info',
            text: 'internet bağlantısı yeniden sağlandı'
         });
      });
   });

   registerFunction(() => {
      const notification = useNotificationStore();
      window.addEventListener('offline', () => {
         notification.createNotification({
            kind: 'warning',
            text: 'internet bağlantısı kesildi'
         });
      });
   });

   runAllFunctions();
}

function registerFunction(func: ArrayChildren) {
   functions.push(func);
}

function runAllFunctions() {
   for (const func of functions) {
      func();
   }
}
