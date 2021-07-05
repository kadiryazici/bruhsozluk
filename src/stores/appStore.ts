import { defineStore } from 'pinia';
import { LoginResponse } from '/src/api/types';

export const useAppStore = defineStore({
   id: 'appStore',
   state: () => ({
      isLogged: false,
      userInformation: <LoginResponse[]>[],
      routerComponentKey: '',
      routerHistoryNames: [] as string[]
   }),
   actions: {
      reloadRouterView() {
         this.routerComponentKey = Math.random().toString().slice(-4);
      }
   }
});
