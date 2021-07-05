<script lang="ts" setup>
import { defineProps } from 'vue';
import type { getHeaderResponse } from '/src/api/types.d';
import EntryVue from '/src/components/Entry/Entry.vue';

interface Props {
   data: getHeaderResponse;
}
const props = defineProps<Props>();
</script>

<template>
   <div class="home-entry">
      <div class="header">
         <RouterLink :to="{ name: 'Header', params: { id: props.data.id } }">
            {{ props.data.name }}
         </RouterLink>
      </div>
      <EntryVue :entryData="entry" v-for="entry in props.data.entries" />
   </div>
</template>

<style lang="scss" scoped>
.home-entry {
   margin-bottom: funcs.padding(5);
}
.header {
   padding: funcs.padding(1) funcs.padding(2);
   background-color: colors.$turq;
   color: colors.$primary;
   border-radius: vars.$radius;
   display: inline-block;
   margin-bottom: funcs.padding(1.5);
   font-size: vars.$headerFontSize;
   * {
      color: inherit;
      text-decoration: inherit;
      &:visited {
         color: inherit;
      }
   }
}
</style>
