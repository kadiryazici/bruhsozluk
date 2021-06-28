<template>
   <div class="_title">
      <div class="_title-icon">
         <slot name="icon" />
      </div>
      <div class="_title-body">
         <slot />
      </div>
   </div>
</template>

<style lang="scss" scoped>
._title {
   display: flex;
   align-items: center;
   flex-direction: row;
   flex-wrap: nowrap;

   ._title-icon {
      display: inline;
      flex-shrink: 1;
      flex-grow: 0;
      align-self: center;
      margin-right: funcs.padding(2);
      &,
      & * {
         font-size: 35px;
      }
   }

   ._title-body {
      width: 100%;
      flex-grow: 1;
      &,
      & * {
         font-size: 25px;
      }
   }
}
</style>
