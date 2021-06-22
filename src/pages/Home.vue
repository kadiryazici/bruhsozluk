<script lang="ts" setup>
import HomeEntry from '/src/components/Home/HomeEntry.vue';
import { usePromise } from 'vierone';
import type { Header } from '/src/api/types.d';
import { getHome } from '/src/api/getHome';
import { onMounted, reactive } from 'vue';

const headers = reactive<Header[]>([]);

onMounted(async () => {
   const [res, err] = await usePromise(getHome());

   if (res) {
      const data = res.data;
      headers.push(...data);
   }
});
</script>

<template>
   <div>
      <HomeEntry :data="header" v-for="header in headers" />
   </div>
</template>

<style lang="scss" scoped></style>
