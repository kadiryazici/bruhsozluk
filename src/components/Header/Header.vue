<script lang="ts" setup>
import { usePromise } from 'vierone';
import { defineProps, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { getHeader } from '/src/api/getHeader';
import Entry from '/src/components/Entry/Entry.vue';
import type { getHeaderResponse } from '/src/api/types.d';

const route = useRoute();

ref: loading = true;
ref: activePage = 1;

const pageData = reactive<getHeaderResponse[]>([]);

onMounted(async () => {
   const id = route.params.id as string;
   const page = route.params.page as string | undefined;

   if (page && !isNaN(parseInt(page))) {
      activePage = parseInt(page);
   }

   const [res, err] = await usePromise(getHeader(id, page));
   if (res) {
      const { data } = res;
      pageData.push(data);
      loading = false;
   }
});
</script>

<template>
   <div v-if="loading">yükleniyor.....</div>
   <div v-else class="header-view">
      <template v-for="header in pageData">
         <div class="header">
            <div class="name">{{ header.name }}</div>
            <div class="page-changer">
               <Icon
                  role="button"
                  aria-label="önceki sayfa"
                  title="önceki sayfa"
                  class="disable icon button"
                  name="keyboard_arrow_left"
               />
               <div :tabindex="0" class="page-number">
                  {{ `${activePage}/${header.totalPage}` }}
                  <div class="page-number-changer">
                     <div
                        :class="{ active: page === activePage }"
                        v-for="page in header.totalPage"
                        :key="page"
                        class="item"
                     >
                        {{ page }}
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
            <Entry
               :entryData="entry"
               class="entry"
               v-for="entry in header.entries"
               :key="entry.id"
            />
         </div>
      </template>
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
