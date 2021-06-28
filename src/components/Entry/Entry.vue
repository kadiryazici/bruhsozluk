<script lang="ts" setup>
import { defineProps, onBeforeUnmount } from 'vue';
import type { Entry } from '/src/api/types';
import { Modal } from 'modal-component-vue3';
import ModalLikes from '/src/components/Modals/Likes/index.vue';
import { getLikesOfEntry } from '/src/api/getLikesOfEntry';
import { usePromise } from 'vierone';
import { useAppStore } from '/src/stores/appStore';

const appStore = useAppStore();

ref: liked = false;
ref: isModalOpen = false;
ref: likesOfEntry = [] as string[];

const props = defineProps<{
   entryData: Entry;
}>();

onBeforeUnmount(() => {
   isModalOpen = false;
});

async function openModal() {
   isModalOpen = true;

   const [res, err] = await usePromise(
      getLikesOfEntry({
         header_id: props.entryData.header_id,
         entry_id: props.entryData.id
      })
   );

   if (res) {
      const { data } = res;
      likesOfEntry = data;
   }
}
</script>

<template>
   <div class="entry-wrapper">
      <div class="entry-body">
         {{ props.entryData.body }}
      </div>
      <div class="entry-footer">
         <div class="entry-info">
            <a href="#" class="link writer">{{ entryData.username }}</a>
            <span role="time" class="date">// {{ entryData.date }}</span>
         </div>
         <div class="icon-section">
            <Icon
               role="button"
               aria-label="beğen"
               title="beğen"
               class="button heart-icon"
               @click="liked = !liked"
               :name="liked ? 'favorite' : 'favorite_border'"
            />
            <span
               v-if="props.entryData.liked_by.length > 0"
               @click="openModal"
               role="button"
               class="count"
               >{{ props.entryData.liked_by.length }}</span
            >
            <Icon
               aria-label="sil"
               title="sil"
               role="button"
               class="button delete-icon"
               name="delete"
               v-if="
                  appStore.isLogged &&
                  appStore.userInformation.length > 0 &&
                  appStore.userInformation[0].isAdmin
               "
            />
         </div>
      </div>

      <Modal v-model:visible="isModalOpen">
         <ModalLikes :users="likesOfEntry" @hide="isModalOpen = false" />
      </Modal>
   </div>
</template>

<style lang="scss" scoped>
.entry-wrapper {
   display: block;
   width: 100%;
   padding: funcs.padding(2);
   background-color: colors.$coal;
   border-radius: vars.$radius;

   .entry-body {
      background-color: colors.$primary;
      padding: funcs.padding(2);
      border-radius: vars.$radius vars.$radius 0 0;
      color: colors.$secondary;
      margin-bottom: funcs.padding(2);
      font-size: vars.$entryBodyFontSize;
      box-shadow: vars.$shadowDarkDown;
      white-space: pre-line;
   }

   .entry-footer {
      // display: flex;
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      background-color: colors.$primary;
      padding: funcs.padding(2);
      border-radius: 0 0 vars.$radius vars.$radius;
      align-items: center;
      // color: colors.$secondary;
      // margin-bottom: funcs.padding(2);
      font-size: vars.$entryFooterFontSize;
      box-shadow: vars.$shadowDarkDown;

      .entry-info {
         margin-right: funcs.padding(2);
         .writer {
            margin-right: funcs.padding(1);
            color: colors.$turq;
            // flex: 1;
         }

         .date {
            color: colors.$coal;
            // flex: 1;
         }
      }

      .icon-section {
         width: 100%;
         flex-basis: 0;
         flex-grow: 1;
         height: 20px;
         align-items: center;
         display: flex;
         .heart-icon {
            font-size: 20px;
            color: colors.$ruby;
            margin-right: funcs.padding(1);
         }
         .count {
            color: colors.$ruby;
            cursor: pointer;
            &:hover {
               text-decoration: underline;
            }
         }
         .delete-icon {
            margin-left: auto;
            color: colors.$secondary;
         }
      }
   }
}
</style>
