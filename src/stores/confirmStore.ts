import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';

export interface IConfirmParams {
   text: string;
   onAccept: () => void;
   onDeny?: () => void;
}

export interface IConfirm extends IConfirmParams {
   id: string;
   createdAt: number;
}

export const useConfirm = defineStore({
   id: 'confirmStore',
   state: () => ({
      activeConfirms: [] as IConfirm[]
   }),
   actions: {
      create(params: IConfirmParams) {
         this.activeConfirms.push({
            ...params,
            id: nanoid(),
            createdAt: Date.now()
         });
      },
      close(id: IConfirm['id']) {
         const index = this.activeConfirms.findIndex(
            confirm => confirm.id === id
         );
         this.activeConfirms.splice(index, 1);
      }
   }
});
