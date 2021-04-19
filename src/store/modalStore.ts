import { computed, reactive } from 'vue';

const modalStore = reactive({
   likesModal: true,
});

const getters = {
   isThereOpenModal: computed(() => {
      return Object.values(modalStore).every(value => value === true);
   }),
};

const methods = {
   closeModals: () => (modalStore.likesModal = false),
};

export const useModalStore = () => modalStore;
export const useModalStoreGetters = () => getters;
export const useModalStoreMethods = () => methods;
