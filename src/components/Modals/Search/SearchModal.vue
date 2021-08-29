<script lang="ts" setup>
import debounce from 'lodash.debounce';
import { usePromise } from 'vierone';
import { computed, reactive, watch } from 'vue';

import type { SearchResponse } from '/src/api/types';

import SearchItemSkeleton from '/src/components/Modals/Search/SearchSkeleton.vue';

import { getSearch } from '/src/api/getSearch';
import { postVerifyHeader } from '/src/api/postVerifyHeader';
import { sanitizeHeaderName } from '/src/helpers/app';
import { useAppStore } from '/src/stores/appStore';
import { useModalStore } from '/src/stores/modalStore';

const appStore = useAppStore();
const modalStore = useModalStore();

let query = $ref('');
let didSearch = $ref(false);
let isSearching = $ref(false);
const sanitizedQuery = $computed(() => sanitizeHeaderName(query));
const headerExisting = reactive({
   notExists: false,
   msg: ''
});

const results = reactive<SearchResponse[]>([]);
//#region Search Function
const Search = debounce(async (query: string) => {
   isSearching = true;
   headerExisting.notExists = false;
   headerExisting.msg = '';

   const [res, err] = await usePromise(getSearch(query));
   if (res) {
      results.length = 0;
      results.push(...res.data);
   }
   didSearch = true;

   if (appStore.isLogged) {
      try {
         const res = await postVerifyHeader(query);
         const data = res.data;
         headerExisting.notExists = true;
         headerExisting.msg = data.msg;
      } catch (error) {
         console.log(error);
      }
   }
   isSearching = false;
}, 350);
//#endregion
//#region Search Query Watcher
watch(
   () => query,
   async newValue => {
      headerExisting.notExists = false;
      if (newValue.length < 1) {
         didSearch = false;
         results.length = 0;
      }
      if (newValue.length > 0) {
         await Search(newValue);
      }
   }
);
//#endregion
</script>

<template>
   <div id="search-modal">
      <div class="searchBox">
         <input
            v-model.trim="query"
            placeholder="Başlık arama"
            class="type-area"
            type="text"
         />
         <div
            @click="modalStore.isSearchModalOpen = false"
            tabindex="0"
            role="button"
            class="closeButton"
         >
            <Icon name="close" />
         </div>
      </div>
      <div class="results">
         <div class="result-area">
            <Transition
               enterActiveClass="can-create-in"
               leaveActiveClass="can-create-out"
            >
               <RouterLink
                  :to="{
                     name: 'CreateHeader',
                     query: {
                        baslik: sanitizedQuery
                     }
                  }"
                  class="can-create link"
                  v-if="headerExisting.notExists"
               >
                  <Icon name="add" />
                  <span class="header-name">
                     {{ sanitizedQuery }}
                  </span>
                  başlığı açılabilir.
               </RouterLink>
            </Transition>

            <h2
               class="not-found"
               v-if="
                  didSearch &&
                  results.length < 1 &&
                  query.length > 0 &&
                  !isSearching
               "
            >
               <Icon name="search_off" />Sonuç Yok
            </h2>

            <template v-else>
               <SearchItemSkeleton v-if="isSearching" />

               <RouterLink
                  v-else
                  class="result-item"
                  v-for="result in results"
                  :to="{
                     name: 'Header',
                     params: {
                        id: result.id
                     }
                  }"
               >
                  {{ result.name }}
               </RouterLink>
            </template>
         </div>
      </div>
   </div>
</template>

<style scoped lang="scss">
$inputBG: colors.$primary;
$bodyBG: colors.$tertiary;
$inputHeight: 50px;

#search-modal {
   margin: calc(auto + funcs.padding(1));
   display: flex;
   flex-flow: column nowrap;
   width: 100%;
   height: 100%;
   max-width: 600px;
   max-height: 600px;
   border-radius: vars.$radius;
   align-items: center;
   overflow: hidden;
   pointer-events: none;
   & > * {
      pointer-events: all;
   }
   .searchBox {
      width: 100%;
      height: $inputHeight;
      min-height: $inputHeight;
      background-color: $inputBG;
      border-radius: 100px;
      margin-bottom: -20px;
      z-index: 2;
      position: relative;
      box-shadow: vars.$shadowDarkDown;

      .closeButton {
         width: $inputHeight - 10px;
         height: $inputHeight - 10px;
         background-color: colors.$ruby;
         color: colors.$secondary;
         display: inline-flex;
         align-items: center;
         justify-content: center;
         position: absolute;
         right: 5px;
         top: 0;
         bottom: 0;
         margin-top: auto;
         margin-bottom: auto;
         // border: 2px solid colors.$turq;
         border-radius: 50%;
         cursor: pointer;
         * {
            font-size: 25px;
         }
         &:hover {
            background-color: colors.$secondary;
            color: colors.$ruby;
         }
      }

      .type-area {
         width: 100%;
         height: 100%;
         border-radius: 100px;
         border: none;
         background-color: transparent;
         border: 2px solid darken(colors.$secondary, 60%);
         color: colors.$secondary;
         padding: funcs.padding(2) funcs.padding(3);
         padding-right: funcs.padding(11);
         transition: border-color 0.25s;

         &:focus {
            outline: none;
            border-color: colors.$turq;
         }
      }
   }

   .results {
      z-index: 1;
      height: 100%;
      width: calc(100% - 40px);
      border-radius: vars.$radius;
      background-color: $bodyBG;
      opacity: 0;
      animation: slideDown 0.35s 0.25s ease forwards;
      padding: funcs.padding(2);
      display: flex;
      flex-flow: column nowrap;
      overflow: hidden;

      .can-create {
         display: flex;
         align-items: center;
         width: 100%;
         overflow: hidden;
         ._icon {
            font-size: 20px;
         }
         .header-name {
            border-radius: vars.$radius;
            padding: 0 funcs.padding(1);
            background-color: colors.$turq;
            color: colors.$primary;
            margin-right: funcs.padding(1);
         }
         font-size: 13px;
      }
      .result-area {
         background-color: colors.$primary;
         width: 100%;
         height: 100%;
         max-height: 100%;
         flex-shrink: 1;
         border-radius: vars.$radius;
         box-shadow: vars.$shadowDarkDown;
         padding: funcs.padding(2);
         padding-top: funcs.padding(4);
         overflow: auto;
         z-index: 100;

         .not-found {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: funcs.padding(2);
            text-align: center;
            color: colors.$secondary;
            font-size: 20px;
            ._icon {
               font-size: 30px;
               margin-right: funcs.padding(2);
            }
         }

         .result-item {
            width: 100%;
            padding: funcs.padding(2);
            font-size: 15px;
            color: colors.$secondary;
            z-index: 100;
            display: block;
            background-color: colors.$tertiary;
            border-radius: vars.$radius;
            margin-top: funcs.padding(2);
            text-decoration: none;

            &:hover {
               background-color: colors.$turq;
               color: colors.$primary;
            }
         }
      }
   }
}

@keyframes slideDown {
   0% {
      opacity: 1;
      transform: translateY(-100%);
   }
   100% {
      opacity: 1;
      transform: translateY(0%);
   }
}
</style>
