import { defineStore } from 'pinia';

export const useModalStore = defineStore({
   id: 'modalStore',
   state: () => ({
      isProfileModalOpen: false,
      isSearchModalOpen: false
   }),
   getters: {
      isAnyModalOpen(): boolean {
         const modals = [this.isProfileModalOpen, this.isSearchModalOpen];
         const isOpen = !modals.every(v => {
            return v === false;
         });
         return isOpen;
      }
   },
   actions: {
      closeAllModals(): void {
         this.isProfileModalOpen = false;
         this.isSearchModalOpen = false;
      }
   }
});
