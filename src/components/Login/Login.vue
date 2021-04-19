<script lang="ts" setup>
import VInput from '/src/components/Input/Input.vue';
import { reactive, ref } from 'vue';
const input = reactive({
   username: '',
   password: '',
});

ref: username = '';
ref: password = '';
ref: error = true;
</script>

<template>
   <div class="login-wrapper">
      <div class="login-header">giriş</div>
      <div class="login-body">
         <label class="_label">kullanıcı adı</label>
         <VInput
            v-model="username"
            v-model:error="error"
            errorMessage="bu yanlış olabilir"
            :type="'text'"
         />

         <label class="_label">şifre</label>
         <VInput
            v-model:error="error"
            errorMessage="bu da yanlış olabilir bilemiycem"
            v-model="password"
            :type="'password'"
         />
      </div>
      <div class="login-footer">
         <VButton
            @click="error = !error"
            :text-color="'primary'"
            :color="'turq'"
         >
            yolla
         </VButton>
      </div>
   </div>
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

   .login-footer {
      border-radius: 0 0 vars.$radius vars.$radius;
      margin-top: funcs.padding(1.5);
   }
}
</style>
