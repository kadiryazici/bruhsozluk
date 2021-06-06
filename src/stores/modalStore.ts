import { computed, reactive } from 'vue';

interface LikeModalInfo {
   headerID: string;
   entryID: string;
}

const modalStore = reactive({
   visibility: {
      likesModal: false,
   },
   info: {
      likesModal: {
         headerID: '',
         entryID: '',
      } as LikeModalInfo,
   },
});

const getters = {
   isThereOpenModal: computed(() => {
      return Object.values(modalStore.visibility).every(
         value => value === true
      );
   }),
};

const methods = {
   closeModals: () => (modalStore.visibility.likesModal = false),

   openLikeModal({ entryID, headerID }: LikeModalInfo) {
      modalStore.info.likesModal.entryID = entryID;
      modalStore.info.likesModal.headerID = headerID;
      modalStore.visibility.likesModal = true;
   },

   closeLikeModal() {
      modalStore.info.likesModal.entryID = '';
      modalStore.info.likesModal.headerID = '';
      modalStore.visibility.likesModal = false;
   },
};

export const useModalStore = () => modalStore;
export const useModalStoreGetters = () => getters;
export const useModalStoreMethods = () => methods;
