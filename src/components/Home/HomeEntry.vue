<script lang="ts" setup>
import { defineProps } from 'vue';
import EntryVue from '/src/components/Entry/Entry.vue';
import type { Header } from '/src/api/types.d';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{
   data: Header;
}>();
</script>

<template>
   <div class="home-entry">
      <div
         @click="
            router.push({
               name: 'Header',
               params: {
                  id: props.data.id
               }
            })
         "
         class="header"
      >
         {{ props.data.name }}
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
}
</style>
