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
               <component
                  :key="route.fullPath + appStore.routerComponentKey"
                  :is="Component"
               />
            </Transition>
         </router-view>
      </template>
   </Main>

   <NotificationWrapperVue />

   <Modal v-model:visible="modalStore.isProfileModalOpen">
      <ProfileModalVue />
   </Modal>
   <Modal v-model:visible="modalStore.isSearchModalOpen">
      <SearchModalVue />
   </Modal>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import Main from '/src/layouts/Main.vue';
import Left from '/src/components/LeftBar/Left.vue';
import NotificationWrapperVue from '/src/components/Notifications/NotificationWrapper.vue';
import { Modal } from 'modal-component-vue3';
import { useModalStore } from '/src/stores/modalStore';
import { VerifyUser } from '/src/api/auth';
import { usePromise } from 'vierone';
import { useAppStore } from '/src/stores/appStore';
import { onMounted, watchEffect } from 'vue';
import ProfileModalVue from '/src/components/Modals/Profile/ProfileModal.vue';
import SearchModalVue from '/src/components/Modals/Search/SearchModal.vue';
import { OnAppMounted } from '/src/helpers/functionsOnAppMounted';

const modalStore = useModalStore();
const route = useRoute();
const appStore = useAppStore();

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
   if (modalStore.isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
   } else {
      document.body.style.overflow = 'auto';
   }
});
</script>
