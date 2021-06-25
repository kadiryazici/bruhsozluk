<script lang="ts" setup>
import debounce from 'lodash.debounce';
import { usePromise } from 'vierone';
import { reactive, watch } from 'vue';
import { getSearch } from '/src/api/getSearch';
import type { SearchResponse } from '/src/api/types';

ref: query = '';
ref: didSearch = false;

const results = reactive<SearchResponse[]>([]);
const Search = debounce(async (query: string) => {
   const [res, err] = await usePromise(getSearch(query));
   if (res) {
      results.length = 0;
      results.push(...res.data);
   }
   didSearch = true;
}, 350);
watch(
   () => query,
   async newValue => {
      await Search(newValue);
   }
);
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
         <div tabindex="0" role="button" class="searchButton">
            <Icon name="search" />
         </div>
      </div>
      <div class="results">
         <div class="result-area">
            <h2 class="not-found" v-if="didSearch && results.length < 1">
               Sonuç Yok
            </h2>
            <RouterLink
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

      .searchButton {
         width: $inputHeight;
         height: $inputHeight;
         background-color: colors.$turq;
         display: inline-flex;
         align-items: center;
         justify-content: center;
         position: absolute;
         right: 0;
         top: 0;
         border: 2px solid colors.$turq;
         border-radius: 50%;
         cursor: pointer;
         * {
            font-size: 25px;
         }
         &:hover {
            border-color: colors.$secondary;
            background-color: colors.$secondary;
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
            text-align: center;
            color: colors.$secondary;
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
