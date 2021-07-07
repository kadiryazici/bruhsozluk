const key = 'auth_id';
import { useAppStore } from '/src/stores/appStore';
import { useModalStore } from '/src/stores/modalStore';
import { useNotificationStore } from '/src/stores/notificationStore';

export function SetUserAuthID(auth_id: string) {
   return window.localStorage.setItem(key, auth_id);
}
export function GetUserAuthID() {
   return window.localStorage.getItem(key) || 'user not signed in';
}

/**
 ** Must use in vue instance (setup)
 */
export function LogOut() {
   const appStore = useAppStore();
   const modalStore = useModalStore();
   const notification = useNotificationStore();

   window.localStorage.removeItem(key);
   appStore.isLogged = false;
   appStore.userInformation = [];
   modalStore.isProfileModalOpen = false;
   notification.Success({
      text: 'Başarılı bir şekilde çıkış yapıldı'
   });
}
