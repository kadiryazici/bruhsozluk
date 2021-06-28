<script lang="ts" setup>
import { usePromise } from 'vierone';
import { onBeforeUpdate, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getHeader } from '/src/api/getHeader';
import Entry from '/src/components/Entry/Entry.vue';
import type { getHeaderResponse } from '/src/api/types.d';
import AddEntryVue from '/src/components/AddEntry/AddEntry.vue';
import { sanitizeEntryBody } from '/src/helpers/app';
import { postAddEntry } from '/src/api/postAddEntry';
import type { AxiosError } from 'axios';
import { useNotificationStore } from '/src/stores/notificationStore';
import { useAppStore } from '/src/stores/appStore';

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();

ref: loading = true;
ref: activePage = 1;

const pageData = reactive<getHeaderResponse[]>([]);

onMounted(async () => {
   const id = route.params.id as string;
   const page = route.params.page as string | undefined;
   const focus = route.query.focus;

   if (page && !isNaN(parseInt(page))) {
      activePage = parseInt(page);
   }

   const [res, err] = await usePromise(getHeader(id, page));
   if (res) {
      const { data } = res;
      pageData.push(data);
      loading = false;
   }
   setTimeout(() => {
      if (focus && typeof focus === 'string') {
         1;
         const element = document.getElementById(focus);
         if (element) {
            element.scrollIntoView({
               block: 'start',
               behavior: 'smooth'
            });
            element.setAttribute('data-highlight-anim', 'true');
         }
      }
   }, 0);
});

function navigate(kind: 'next' | 'previous') {
   const [header] = pageData;
   if (header) {
      if (kind === 'next') {
         if (activePage < header.totalPage) {
            router.push({
               name: 'Header',
               params: {
                  id: header.id,
                  page: activePage + 1
               }
            });
         }
      } //
      else if (kind === 'previous') {
         if (activePage > 1) {
            router.push({
               name: 'Header',
               params: {
                  id: header.id,
                  page: activePage - 1
               }
            });
         }
      }
   }
}

ref: entryBody = '';
ref: entryLoading = false;
async function addEntry() {
   if (entryLoading) return;

   entryLoading = true;
   const _entryBody = sanitizeEntryBody(entryBody);
   if (_entryBody.length > 0) {
      const header_id = route.params.id as string;
      try {
         const res = await postAddEntry(_entryBody, header_id);
         const { data } = res;
         router.push({
            name: 'Header',
            params: {
               id: header_id,
               page: data.page
            },
            query: {
               focus: data.id
            }
         });
      } catch (err) {
         const _error = () => err as AxiosError;

         const response = _error().response;
         if (response && response.data.msg) {
            const notification = useNotificationStore();
            notification.createNotification({
               kind: 'error',
               text: response.data.msg
            });
         }
      }
   }
   entryLoading = false;
}
</script>

<template>
   <div class="header-view">
      <div v-if="loading">yükleniyor.....</div>
      <template v-else v-for="header in pageData">
         <div class="header">
            <div class="name">{{ header.name }}</div>
            <div class="page-changer">
               <Icon
                  role="button"
                  aria-label="önceki sayfa"
                  title="önceki sayfa"
                  class="icon button"
                  :class="{
                     disable: activePage == 1
                  }"
                  @click="navigate('previous')"
                  name="keyboard_arrow_left"
               />
               <!-- PAGE SELECTOR -->
               <div :tabindex="0" class="page-number">
                  {{ `${activePage}/${header.totalPage}` }}
                  <div class="page-number-changer">
                     <div
                        :class="{ active: page === activePage }"
                        v-for="page in header.totalPage"
                        :key="page"
                        class="item"
                        role="navigation"
                     >
                        <RouterLink
                           :to="{
                              name: 'Header',
                              params: {
                                 id: header.id,
                                 page
                              }
                           }"
                        >
                           {{ page }}
                        </RouterLink>
                     </div>
                  </div>
               </div>
               <!-- PAGE SELECTOR END -->
               <Icon
                  role="button"
                  aria-label="sonraki sayfa"
                  title="sonraki sayfa"
                  class="icon button"
                  @click="navigate('next')"
                  :class="{
                     disable: activePage >= header.totalPage
                  }"
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
               :id="entry.id"
            />
         </div>
         <div v-if="appStore.isLogged" class="add-entry">
            <AddEntryVue
               :loading="entryLoading"
               @send="addEntry"
               v-model="entryBody"
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

            &:focus .page-number-changer,
            &:focus-within .page-number-changer {
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
                  width: 100%;
                  display: flex;
                  color: colors.$secondary;
                  text-align: center;

                  &:hover {
                     background-color: colors.$coal;
                  }

                  &.active {
                     color: colors.$turq;
                  }

                  a {
                     color: inherit;
                     text-decoration: inherit;
                     width: 100%;
                     padding: funcs.padding(1) funcs.padding(1.5);

                     &::visited {
                        color: inherit;
                     }
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

   .add-entry {
      margin-top: funcs.padding(4);
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
