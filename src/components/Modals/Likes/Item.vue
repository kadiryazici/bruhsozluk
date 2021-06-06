<template>
   <div class="_likeItem">
      <Icon class="_icon" name="person" />
      <RouterLink to="#" class="text link">
         <slot />
      </RouterLink>
   </div>
</template>

<style lang="scss" scoped>
._likeItem {
   display: flex;
   align-items: center;
   background-color: colors.$primary;
   margin-bottom: funcs.padding(1.5);
   box-shadow: vars.$shadowDarkDown;
   flex-flow: row nowrap;
   border-radius: vars.$radius;
   padding: funcs.padding(1);

   &:last-of-type {
      margin-bottom: 0px;
   }

   ._icon {
      font-size: 30px;
      color: colors.$secondary;
      margin-right: funcs.padding(1.5);
   }

   .text {
      width: 100%;
      color: colors.$turq;
   }
}
</style>
