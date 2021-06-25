<script lang="ts" setup>
import { onMounted, onUnmounted, Teleport } from 'vue';
import Notification from '/src/components/Notifications/Notification.vue';
import { useNotificationStore } from '/src/stores/notificationStore';

const notificationStore = useNotificationStore();

let interval: ReturnType<typeof setInterval> | null = null;
function checker() {
   notificationStore.notifications.forEach((n, index) => {
      if (!n.stay) {
         if (Date.now() > n.duration! + n.createdAt) {
            notificationStore.deleteNotification(n.id);
         }
      }
   });
}

function createChecker() {
   interval = setInterval(checker, 250);
}

function stopChecker() {
   if (interval) {
      clearInterval(interval);
      interval = null;
   }
}

onMounted(() => {
   createChecker();
});
onUnmounted(stopChecker);
</script>

<template>
   <Teleport to="body">
      <div id="notification-wrapper">
         <TransitionGroup
            enterActiveClass="notification-in"
            leaveActiveClass="notification-out"
         >
            <Notification
               :notificationData="notification"
               :key="notification.id"
               v-for="(notification, index) in notificationStore.notifications"
            />
         </TransitionGroup>
      </div>
   </Teleport>
</template>

<style lang="scss" scoped>
$width: 350px;

#notification-wrapper {
   display: flex;
   justify-content: flex-end;
   flex-flow: column nowrap;
   width: $width;
   height: 100%;
   position: fixed;
   right: 0;
   top: 0;
   z-index: 100;
   pointer-events: none;
   padding: funcs.padding(1) funcs.padding(2);
}
</style>
