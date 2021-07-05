<script lang="ts" setup>
import { usePromise } from 'vierone';
import { onMounted, reactive } from 'vue';
import { Head } from '@vueuse/head';

import type { getHeaderResponse } from '/src/api/types.d';

import HomeEntry from '/src/components/Home/HomeEntry.vue';

import { getHome } from '/src/api/getHome';

const headers = reactive<getHeaderResponse[]>([]);

onMounted(async () => {
   const [res, err] = await usePromise(getHome());

   if (res) {
      const { data } = res;
      headers.push(...data);
   }
});
</script>

<template>
   <div>
      <Head>
         <title>Bruhsözlük</title>
      </Head>
      <HomeEntry :data="header" v-for="header in headers" />
   </div>
</template>

<style lang="scss" scoped></style>
