import { defineStore } from 'pinia';

export const useModalStore = defineStore({
   id: 'modalStore',
   state: () => ({
      isProfileModalOpen: false,
      isSearchModalOpen: false
   }),
   getters: {
      isAnyModalOpen(state): boolean {
         const modals = [state.isProfileModalOpen, state.isSearchModalOpen];
         const isOpen = !modals.every(m => m === false);
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
