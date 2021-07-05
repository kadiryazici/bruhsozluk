<script lang="ts" setup>
import { LogOut } from '/src/helpers/auth';
import { useAppStore } from '/src/stores/appStore';

const appStore = useAppStore();
</script>

<template>
   <div class="profile-popup-menu">
      <div class="profile-icon">
         <Icon name="person" />
      </div>
      <div class="select">
         <RouterLink
            :to="{
               name: 'Profile',
               params: {
                  username: appStore.userInformation[0].username
               }
            }"
            role="button"
            class="select-item margin"
         >
            <Icon class="select-icon" name="person" />
            Profili Görüntüle
         </RouterLink>

         <div @click="LogOut" role="button" class="select-item">
            <Icon class="select-icon" name="logout" />
            Çıkış Yap
         </div>
      </div>
   </div>
</template>

<style scoped lang="scss">
.profile-popup-menu {
   display: flex;
   width: 100%;
   max-width: 350px;
   max-height: 350px;
   min-height: 150px;
   background-color: colors.$primary;
   flex-flow: column nowrap;
   border-radius: vars.$radius;
   padding: funcs.padding(2);

   .profile-icon {
      padding: funcs.padding(4);
      text-align: center;
      * {
         color: colors.$secondary;
         font-size: 75px;
      }
   }

   .select {
      display: flex;
      margin-top: auto;
      flex-flow: column nowrap;
      color: colors.$secondary;

      .select-item {
         width: 100%;
         background-color: colors.$tertiary;
         border-radius: vars.$radius;
         padding: funcs.padding(3);
         cursor: pointer;
         display: flex;
         align-items: center;
         width: 100%;
         flex-flow: row nowrap;
         color: colors.$secondary;
         text-decoration: none;

         .select-icon {
            margin-right: funcs.padding(1);
         }

         &.margin {
            margin-bottom: funcs.padding(1);
         }

         &:hover {
            color: colors.$primary;
            background-color: colors.$turq;
         }
      }
   }
}
</style>
