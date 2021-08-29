<script lang="ts" setup>
import { computed } from 'vue';
import type { Colors } from '/src/components/Button/Button.vue';
import { useConfirm } from '/src/stores/confirmStore';

const confirm = useConfirm();
const confirmValue = $computed(
   () => confirm.activeConfirms[confirm.activeConfirms.length - 1]
);

function handleAccept() {
   confirmValue.onAccept();
   confirm.close(confirmValue.id);
}
function handleDeny() {
   if (confirmValue.onDeny) confirmValue.onDeny();
   confirm.close(confirmValue.id);
}

//#region Button Props
const acceptButton = $computed(() => ({
   textColor: 'lime' as Colors,
   color: 'lime' as Colors,
   bordered: true,
   size: '15px'
}));
const denyButton = $computed(() => ({
   textColor: 'ruby' as Colors,
   color: 'ruby' as Colors,
   bordered: true,
   size: '15px'
}));
//#endregion
</script>

<template>
   <Teleport to="body">
      <Transition
         mode="out-in"
         enterActiveClass="confirm-anim-in"
         leaveActiveClass="confirm-anim-out"
      >
         <div
            @click.self="confirm.close(confirmValue.id)"
            v-if="confirm.activeConfirms.length > 0"
            class="confirm-wrapper"
         >
            <div class="_confirm">
               <div class="_type">
                  <Icon name="help" />
               </div>

               <div class="_body">
                  <div class="_text">
                     {{ confirmValue.text }}
                  </div>

                  <div class="_buttons">
                     <VButton @click="handleAccept" v-bind="acceptButton">
                        <Icon class="_icon" name="done" />
                        evet
                     </VButton>

                     <span class="seperator"></span>

                     <VButton @click="handleDeny" v-bind="denyButton">
                        <Icon class="_icon" name="close" />
                        hayır
                     </VButton>
                  </div>
               </div>
            </div>
         </div>
      </Transition>
   </Teleport>
</template>

<style lang="scss" scoped>
.confirm-wrapper {
   display: flex;
   margin: funcs.padding(1);
   position: fixed;
   left: 0;
   top: 0;
   z-index: 99999;
   background-color: rgba(0, 0, 0, 0.5);
   width: 100%;
   height: 100%;
   ._confirm {
      margin: auto;
      display: flex;
      width: 400px;
      min-height: 250px;
      flex-flow: column nowrap;
      background-color: colors.$primary;
      border: 1px solid darken(colors.$secondary, 80%);
      overflow: hidden;
      border-radius: vars.$radius;

      ._type {
         width: 100%;
         height: 100px;
         background-color: colors.$turq;
         display: flex;
         align-items: center;
         justify-content: center;
         * {
            font-size: 75px;
            color: colors.$secondary;
            text-shadow: vars.$shadowDarkDownText;
         }
      }

      ._body {
         height: 100%;
         width: 100%;
         flex: 1;
         padding: funcs.padding(3);
         display: flex;
         flex-flow: row wrap;
      }

      ._text {
         width: 100%;
         font-size: 19px;
         text-align: center;
         color: colors.$secondary;
      }

      ._buttons {
         width: 100%;
         align-self: flex-end;
         justify-content: center;
         display: flex;

         ._icon {
            margin-right: funcs.padding(2);
            font-size: 15px;
         }
         .seperator {
            width: funcs.padding(2);
            display: inline-block;
            height: 10px;
         }
      }
   }
}

.confirm-anim-in {
   animation: 0.25s confirm-anim-in ease forwards;
}

.confirm-anim-out {
   animation: 0.25s confirm-anim-in ease reverse forwards;
}

@keyframes confirm-anim-in {
   0% {
      opacity: 0;
      transform: scale(1.35);
   }
   100% {
      opacity: 1;
      transform: scale(1);
   }
}
</style>
