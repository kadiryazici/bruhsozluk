<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

import type { MsgResponse } from '/src/api/types';
import type { AxiosError } from 'axios';

import VInput from '/src/components/Input/Input.vue';

import { postSignup } from '/src/api/postSignup';
import { useNotificationStore } from '/src/stores/notificationStore';

const router = useRouter();
const notification = useNotificationStore();

ref: error = false;
const input = reactive({
   username: '',
   password: ''
});

async function handleSignUP() {
   if (!input.username.length && !input.username.length) {
      notification.Error({
         text: 'Lütfen alanları gerektiği şekilde doldurun.'
      });
      return;
   }

   try {
      await postSignup({ ...input });
      router.push({ name: 'Login' });
      notification.Success({ text: 'başarılı bir şekilde kayıt yapıldı' });
   } catch (err: unknown) {
      const error = err as AxiosError;
      if (error.response && error.response.data.msg) {
         notification.Error({
            text: error.response.data.msg
         });
      } else {
         notification.Error({ text: 'Kayıt olma sırasında bir hata oluştu.' });
      }
      return;
   }
}
</script>

<template>
   <form @submit.prevent="handleSignUP" class="login-wrapper">
      <div class="login-header">kayıt ol</div>
      <div class="login-body">
         <label class="_label">kullanıcı adı</label>
         <VInput
            v-model="input.username"
            v-model:error="error"
            errorMessage="bu yanlış olabilir"
            :type="'text'"
         />

         <label class="_label">şifre</label>
         <VInput
            v-model:error="error"
            errorMessage="bu da yanlış olabilir bilemiycem"
            v-model="input.password"
            :type="'password'"
         />
         <div class="bottom-text">
            <RouterLink
               class="link"
               :to="{
                  name: 'Login'
               }"
            >
               Hesabınız zaten var mı? giriş yapın o zaman.
            </RouterLink>
         </div>
      </div>
      <div class="login-footer">
         <VButton bordered :text-color="'lime'" :color="'lime'">
            yolla
         </VButton>
      </div>
   </form>
</template>

<style lang="scss" scoped>
$wrapperWidth: 500px;
.login-wrapper {
   display: flex;
   position: relative;
   width: 100%;
   max-width: $wrapperWidth;
   // height: $wrapperWidth;
   flex-flow: column nowrap;
   padding: funcs.padding(2);
   background-color: colors.$coal;
   border-radius: vars.$radius;

   .login-header,
   .login-footer,
   .login-body {
      width: 100%;
      background-color: colors.$primary;
      padding: funcs.padding(2);
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      // border-radius: 0 0 vars.$radius vars.$radius;
      box-shadow: vars.$shadowDarkDown;
   }

   .login-header {
      color: colors.$secondary;
      font-size: 20px;
      border-radius: vars.$radius vars.$radius 0 0;
      margin-bottom: funcs.padding(1.5);
   }

   .login-body {
      height: 100%;
      flex-flow: column;
      padding: funcs.padding(5);

      ._label {
         color: colors.$lightDark;
         margin-bottom: funcs.padding(1);
      }
   }

   .bottom-text {
      font-size: 13px;
      .link {
         color: colors.$turq;
      }
   }

   .login-footer {
      border-radius: 0 0 vars.$radius vars.$radius;
      margin-top: funcs.padding(1.5);
   }
}
</style>
