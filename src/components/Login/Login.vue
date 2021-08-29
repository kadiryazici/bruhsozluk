<script lang="ts" setup>
import { reactive } from 'vue';

import type { MsgResponse } from '/src/api/types';
import type { AxiosError } from 'axios';

import VInput from '/src/components/Input/Input.vue';

import { postLogin } from '/src/api/postLogin';
import { useAppStore } from '/src/stores/appStore';
import { useRouter } from 'vue-router';
import { SetUserAuthID } from '/src/helpers/auth';
import { useNotificationStore } from '/src/stores/notificationStore';

const router = useRouter();
const appStore = useAppStore();
const notification = useNotificationStore();

let error = $ref(false);
const input = reactive({
   username: '',
   password: ''
});

async function handleLogin() {
   if (!input.username.length && !input.username.length) {
      notification.Error({
         text: 'Lütfen alanları gerektiği şekilde doldurun.'
      });
      return;
   }

   try {
      const res = await postLogin({ ...input });
      appStore.isLogged = true;
      appStore.userInformation.unshift(res.data);
      const [user] = appStore.userInformation;
      SetUserAuthID(user.auth_id);
      router.push({
         name: 'Home'
      });
      notification.Success({
         text: 'başarılı bir şekilde giriş yapıldı'
      });
   } catch (err: unknown) {
      const { response } = err as AxiosError;
      input.password = '';

      if (response && response.data.msg) {
         notification.Error({ text: response.data.msg as string });
      } else {
         notification.Error({ text: 'Giriş yaparken bir hata oldu.' });
      }
      return;
   }
}
</script>

<template>
   <form @submit.prevent="handleLogin" class="login-wrapper">
      <div class="login-header">giriş</div>
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
                  name: 'Signup'
               }"
            >
               Hesabınız yok mu? O zaman kayıt olun.
            </RouterLink>
         </div>
      </div>
      <div class="login-footer">
         <VButton bordered :text-color="'lime'" :color="'lime'">yolla</VButton>
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
