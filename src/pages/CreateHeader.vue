<script lang="ts" setup>
import TitleVue from '/src/components/Title/Title.vue';
import VInput from '/src/components/Input/Input.vue';
import { useRoute, useRouter } from 'vue-router';
import { sanitizeEntryBody, sanitizeHeaderName } from '/src/helpers/app';
import { postCreateHeader } from '/src/api/postCreateHeader';
import type { AxiosError, AxiosResponse } from 'axios';
import AddEntryVue from '/src/components/AddEntry/AddEntry.vue';

const route = useRoute();
const router = useRouter();

ref: headerName = '';
ref: error = false;
ref: errorMessage = 'Bu başlık açılamaz.';
ref: entryBody = '';
ref: loading = false;

if (route.query.baslik && typeof route.query.baslik == 'string') {
   console.log(route);
   headerName = sanitizeHeaderName(route.query.baslik);
}

async function createHeader() {
   if (loading) return;

   try {
      if (sanitizeEntryBody(entryBody).length > 0) {
         loading = true;
         const res = await postCreateHeader(headerName, entryBody);
         const { data } = res;
         router.push({
            name: 'Header',
            params: {
               id: data.id,
               page: data.entryPage
            }
         });
      }
   } catch (err) {
      error = true;
      const _error = () => err as AxiosError;

      const response = _error().response;
      if (response && response.data.msg) {
         errorMessage = response.data.msg;
      }
   }
   loading = false;
}
</script>

<template>
   <form @submit.prevent id="create-header">
      <TitleVue class="title">
         <template #icon>
            <Icon name="add_circle" />
         </template>
         Başlık Oluşturma
      </TitleVue>

      <VInput
         maxlength="50"
         name="headerName"
         placeholder="başlık ismi"
         type="text"
         v-model="headerName"
         :errorMessage="errorMessage"
         v-model:error="error"
      />

      <div class="entry_area">
         <AddEntryVue :hideSend="true" v-model="entryBody" />
      </div>

      <div class="button-area">
         <VButton
            size="17px"
            @click="createHeader"
            :textColor="'primary'"
            :color="'turq'"
            :loading="loading"
            >oluştur</VButton
         >
      </div>
   </form>
</template>

<style lang="scss" scoped>
#create-header {
   color: colors.$secondary;

   & > * {
      margin-bottom: funcs.padding(3);
   }

   .button-area {
      text-align: center;

      * {
         font-size: 13px !important;
      }
   }
}
</style>
