<script lang="ts" setup>
import Entry from '/src/components/Entry/Entry.vue';
</script>

<template>
   <div class="header-view">
      <div class="header">
         <div class="name">bruh sözlüğün mükemmel bir site olması</div>
         <div class="page-changer">
            <Icon
               role="button"
               aria-label="önceki sayfa"
               title="önceki sayfa"
               class="disable icon button"
               name="keyboard_arrow_left"
            />
            <div :tabindex="0" class="page-number">
               1/5
               <div class="page-number-changer">
                  <div
                     :class="{ active: n === 1 }"
                     v-for="n in 20"
                     :key="n"
                     class="item"
                  >
                     {{ n }}
                  </div>
               </div>
            </div>
            <Icon
               role="button"
               aria-label="sonraki sayfa"
               title="sonraki sayfa"
               class="icon button"
               name="keyboard_arrow_right"
            />
         </div>
      </div>
      <div class="entries">
         <Entry class="entry" v-for="n in 7" :key="n" />
      </div>
   </div>
</template>

<style lang="scss" scoped>
.header-view {
   .header {
      padding: funcs.padding(2) funcs.padding(2);
      background-color: colors.$turq;
      color: colors.$primary;
      border-radius: vars.$radius;
      display: inline-flex;
      align-items: center;
      flex-flow: row nowrap;
      margin-bottom: funcs.padding(5);
      font-size: vars.$headerFontSize;
      width: 100%;
      position: sticky;
      position: -webkit-sticky;
      top: funcs.padding(0);

      .name {
         color: colors.$primary;
         width: 100%;
         flex: 1;
      }

      .page-changer {
         padding: 0 funcs.padding(2);
         display: flex;
         flex-flow: row nowrap;
         cursor: pointer;

         .page-number {
            padding: funcs.padding(1) funcs.padding(1.5);
            border-radius: vars.$radius;
            background-color: colors.$primary;
            color: colors.$turq;
            position: relative;
            outline: none;

            &:focus .page-number-changer {
               display: block;
            }
            .page-number-changer {
               position: absolute;
               background-color: colors.$primary;
               border-radius: vars.$radius;
               top: 0;
               left: 0;
               width: 100%;
               display: none;
               box-shadow: 0px 0px 4px 0px rgba(colors.$secondary, 20%);
               transform-origin: 50% 0%;
               animation: zoomIn 0.2s;
               max-height: 250px;
               overflow-y: auto;
               overscroll-behavior-y: contain;

               .item {
                  padding: funcs.padding(1) funcs.padding(1.5);
                  width: 100%;
                  color: colors.$secondary;
                  text-align: center;

                  &:hover {
                     background-color: colors.$coal;
                  }

                  &.active {
                     color: colors.$turq;
                  }
               }
            }
         }

         .icon {
            font-size: 25px;

            &.disable {
               opacity: 0.5;
            }
         }
      }
   }

   .entries {
      .entry {
         margin-bottom: funcs.padding(5);

         &:last-child {
            margin-bottom: funcs.padding(0);
         }
      }
   }
}

@keyframes zoomIn {
   0% {
      transform: scale(0);
      opacity: 0;
   }
   100% {
      transform: scale(1);
      opacity: 1;
   }
}
</style>
