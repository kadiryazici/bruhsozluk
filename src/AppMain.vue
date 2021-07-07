<template>
   <Main>
      <template #left>
         <Left />
      </template>
      <template #content>
         <router-view v-slot="{ Component }">
            <Transition
               mode="out-in"
               leaveActiveClass="page-animate-out"
               enterActiveClass="page-animate-in"
            >
               <!-- <KeepAlive :max="10"> -->
               <component
                  :key="
                     route.fullPath.split('#')[0] + appStore.routerComponentKey
                  "
                  :is="Component"
               />
               <!-- </KeepAlive> -->
            </Transition>
         </router-view>
      </template>
   </Main>

   <NotificationWrapperVue />
   <ConfirmView />

   <Modal v-model:visible="modalStore.isProfileModalOpen">
      <ProfileModalVue />
   </Modal>
   <Modal v-model:visible="modalStore.isSearchModalOpen">
      <SearchModalVue />
   </Modal>
</template>

<script lang="ts" setup>
import { onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { usePromise } from 'vierone';
import { Modal } from 'modal-component-vue3';

import Main from '/src/layouts/Main.vue';
import Left from '/src/components/LeftBar/Left.vue';
import NotificationWrapperVue from '/src/components/Notifications/NotificationWrapper.vue';
import ProfileModalVue from '/src/components/Modals/Profile/ProfileModal.vue';
import SearchModalVue from '/src/components/Modals/Search/SearchModal.vue';
import ConfirmView from '/src/components/Confirm/ConfirmView.vue';

import { useModalStore } from '/src/stores/modalStore';
import { VerifyUser } from '/src/api/auth';
import { useAppStore } from '/src/stores/appStore';
import { OnAppMounted } from '/src/helpers/functionsOnAppMounted';
import { useConfirm } from './stores/confirmStore';

const modalStore = useModalStore();
const route = useRoute();
const appStore = useAppStore();
const confirm = useConfirm();

if (!import.meta.env.SSR) {
   const [res, err] = await usePromise(VerifyUser());
   if (!err) {
      appStore.isLogged = true;
      appStore.userInformation = [res!];
   }
}

onMounted(() => {
   OnAppMounted();
});

watchEffect(() => {
   if (modalStore.isAnyModalOpen || confirm.activeConfirms.length > 0) {
      document.body.style.overflow = 'hidden';
   } else {
      document.body.style.overflow = 'auto';
   }
});
</script>
