<script lang="ts" setup>
import Entry from '/src/components/Entry/Entry.vue';
ref: headers = [
   '27 mart sorunsalı',
   'bugün attan düşmem',
   'faruk yeşil neden bu kadar ünlü',
   'bruh sözlük güzel sözlük',
   '1.55 boyunda kıllı gözlüklü göbekli erkek',
];
</script>

<template>
   <div class="home-entry">
      <div class="header">
         {{ headers[Math.floor(Math.random() * headers.length)] }}
      </div>
      <Entry />
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
