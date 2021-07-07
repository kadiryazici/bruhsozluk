<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import type { AxiosError } from 'axios';
import { Head } from '@vueuse/head';

import TitleVue from '/src/components/Title/Title.vue';
import VInput from '/src/components/Input/Input.vue';
import EntryTextArea from '/src/components/EntryTextArea/EntryTextArea.vue';

import { sanitizeEntryBody, sanitizeHeaderName } from '/src/helpers/app';
import { postCreateHeader } from '/src/api/postCreateHeader';

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
         const { data } = await postCreateHeader(headerName, entryBody);
         router.push({
            name: 'Header',
            params: {
               id: data.id,
               page: data.entryPage
            }
         });
      }
   } catch (err: unknown) {
      const requestError = err as AxiosError;
      const response = requestError.response;
      if (response && response.data.msg) {
         errorMessage = response.data.msg;
         error = true;
      } else {
         errorMessage = 'Bir hata oluştu.';
         error = true;
      }
   }
   loading = false;
}
</script>

<template>
   <form @submit.prevent id="create-header">
      <Head>
         <title>Başlık Oluşturma | Bruhsozluk</title>
      </Head>
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
         <EntryTextArea hideSend v-model="entryBody" />
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
