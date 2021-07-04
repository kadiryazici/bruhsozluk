<script lang="ts" setup>
import type { Notification } from '/src/stores/notificationStore';
import { useNotificationStore } from '/src/stores/notificationStore';

const nStore = useNotificationStore();

const NotificationIcon = {
   success: 'check_circle',
   error: 'error',
   warning: 'warning',
   info: 'info'
};

const Icons = new Map<string, string>();
Icons.set('success', 'check_circle');
Icons.set('error', 'error');
Icons.set('warning', 'warning');
Icons.set('info', 'info');

class Configs {
   static Title = class {
      static success = 'başarılı';
      static error = 'hata';
      static warning = 'uyarı';
      static info = 'bilgi';
   };
   static Icon = class {
      static success = 'check_circle';
      static error = 'error';
      static warning = 'warning';
      static info = 'info';
   };
}

const props = defineProps<{
   notificationData: Notification;
}>();

function handleNotificationClick() {
   if (props.notificationData.onClick) {
      props.notificationData.onClick();
   }
   nStore.deleteNotification(props.notificationData.id);
}
</script>

<template>
   <div
      @click="handleNotificationClick"
      class="notification"
      :class="notificationData.kind"
   >
      <div class="title">{{ Configs.Title[notificationData.kind] }}</div>
      <div class="body">{{ props.notificationData.text }}</div>
      <div :class="[notificationData.kind]" class="type">
         <Icon :name="Configs.Icon[notificationData.kind]" />
      </div>
   </div>
</template>

<style lang="scss" scoped>
$bg: colors.$coal;
$fore: colors.$primary;
$success: colors.$lime;
$warning: colors.$sun;
$error: colors.$ruby;
$info: colors.$turq;

$titleFontSize: 17px;
$bodyFontSize: 14px;

$identifierDimension: 35px;

$titleColor: colors.$secondary;
$bodyColor: colors.$secondary;

.notification {
   width: 100%;
   display: flex;
   position: relative;
   padding-left: funcs.padding(1);
   padding-right: funcs.padding(1);
   background-color: $bg;
   flex-shrink: 0;
   flex-grow: 0;
   margin-bottom: funcs.padding(4);
   border-radius: vars.$radius;
   flex-flow: column nowrap;
   pointer-events: all;

   .title {
      margin-bottom: funcs.padding(1);
      margin-top: funcs.padding(1);
      background-color: $fore;
      width: 100%;
      padding: funcs.padding(1);
      border-radius: vars.$radius vars.$radius 0 0;
      box-shadow: vars.$shadowDarkDown;
      font-size: $titleFontSize;
      color: $titleColor;
      text-align: center;
   }
   .body {
      padding: funcs.padding(1);
      margin-bottom: funcs.padding(1);
      border-radius: 0 0 vars.$radius vars.$radius;
      background-color: $fore;
      font-size: $bodyFontSize;
      box-shadow: vars.$shadowDarkDown;
      color: $bodyColor;
      min-height: 75px;
      text-align: center;
   }

   .type {
      width: $identifierDimension;
      height: $identifierDimension;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      background-color: $bg;
      box-shadow: vars.$shadowDarkDown;
      border-radius: vars.$radius;
      left: 0;
      top: 0;
      transform: translate(-50%, -50%);

      &,
      & * {
         font-size: 25px;
      }

      &.success {
         color: $success;
         $borderValue: 3px solid $success;
         border: $borderValue;
      }
      &.error {
         color: $error;
         $borderValue: 3px solid $error;
         border: $borderValue;
      }
      &.warning {
         color: $warning;
         $borderValue: 3px solid $warning;
         border: $borderValue;
      }
      &.info {
         color: $info;
         $borderValue: 3px solid $info;
         border: $borderValue;
      }
   }
}
</style>
