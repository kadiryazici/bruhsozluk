<template>
   <div id="page-404">
      <div class="icon-404">
         <Icon name="search_off" />
      </div>
      <div class="label-404">
         Aradığın şeyi bulamadık. Sorun sende değil bizde.
      </div>
   </div>
</template>

<style lang="scss" scoped>
#page-404 {
   text-align: center;
   // padding-top: funcs.padding(5);
   .icon-404 {
      * {
         font-size: 200px;
         color: colors.$ruby;
      }
   }

   .label-404 {
      font-size: 25px;
      color: colors.$secondary;
   }
}
</style>
