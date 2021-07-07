<script lang="ts">
type TemplateRef<T> = null | T;
</script>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted } from 'vue';
import { Modal } from 'modal-component-vue3';
import { usePromise } from 'vierone';

import type { AxiosError } from 'axios';
import type { EntryResponse } from '/src/api/types';
import type { RouterLinkProps } from 'vue-router';

import ModalLikes from '/src/components/Modals/Likes/index.vue';

import { getLikesOfEntry } from '/src/api/getLikesOfEntry';
import { useAppStore } from '/src/stores/appStore';
import { msToDateString } from '/src/helpers/app';
import { useNotificationStore } from '/src/stores/notificationStore';
import { deleteEntry } from '/src/api/deleteEntry';
import { postLikeEntry, postUnLikeEntry } from '/src/api/postLikeOrUnlike';
import { useConfirm } from '/src/stores/confirmStore';

interface Emits {
   (event: 'atMount', value: HTMLElement): void;
}
interface Props {
   entryData: EntryResponse;
}

const emit = defineEmits<Emits>();
const props = defineProps<Props>();
const appStore = useAppStore();
const notification = useNotificationStore();
const confirm = useConfirm();

ref: liked = props.entryData.didLike;
ref: likeRequestLoading = false;
ref: likesOfEntry = [] as string[];
ref: entryWrapper = null as TemplateRef<HTMLElement>;
ref: isLikeModalOpen = false;
ref: isDeleteModalOpen = false;
ref: canDelete = computed(
   () =>
      appStore.isLogged &&
      appStore.userInformation.length > 0 &&
      (appStore.userInformation[0].isAdmin ||
         appStore.userInformation[0].username === props.entryData.username)
);
ref: entryURL = computed(() => {
   const { id: entryID } = props.entryData;
   const { header_id, page } = props.entryData;

   type To = RouterLinkProps['to'];
   return {
      name: 'Header',
      query: { focus: entryID },
      params: { id: header_id, page }
   } as To;
});

onMounted(() => {
   if (entryWrapper) {
      emit('atMount', entryWrapper);
   }
});
onBeforeUnmount(() => {
   isLikeModalOpen = false;
   isDeleteModalOpen = false;
});

//#region OpenModal
async function openModal() {
   const [res, err] = await usePromise(
      getLikesOfEntry({
         header_id: props.entryData.header_id,
         entry_id: props.entryData.id
      })
   );

   if (res) {
      const { data } = res;
      likesOfEntry = data;
      isLikeModalOpen = true;
   }
}
//#endregion
//#region handleEntryDelete
async function handleEntryDelete() {
   try {
      const { data: resData } = await deleteEntry({
         header_id: props.entryData.header_id,
         entry_id: props.entryData.id
      });
      notification.Success({
         text: resData.msg
      });
      appStore.reloadRouterView();
   } catch (error: unknown) {
      const _error = error as AxiosError;
      const response = _error.response || null;
      if (response && response.data.msg) {
         notification.Error({
            text: response.data.msg as string
         });
      } //
      else {
         notification.Error({
            text: 'Entry silinirken bir hata oluştu.'
         });
      }
   }
   isDeleteModalOpen = true;
}
//#endregion
//#region LikeDislike
type LikeOrDislikeParam = 'like' | 'dislike';
async function changeLike() {
   if (likeRequestLoading) return;
   likeRequestLoading = true;
   const kind = liked ? 'unlike' : 'like';

   const requestBody = {
      header_id: props.entryData.header_id,
      entry_id: props.entryData.id
   };
   if (kind === 'like') {
      try {
         const { data } = await postLikeEntry(requestBody);
         notification.Success({
            text: data.msg
         });
         props.entryData.likeCount += 1;
         liked = true;
      } catch (_err: unknown) {
         let text = 'İşlemde bir hata oluştu.';
         const error = _err as AxiosError;
         if (error.response && error.response.data && error.response.data.msg) {
            text = error.response.data.msg as string;
         }
         notification.Error({ text });
      }
   } else {
      try {
         const { data } = await postUnLikeEntry(requestBody);
         notification.Success({
            text: data.msg
         });
         props.entryData.likeCount -= 1;
         liked = false;
      } catch (_err: unknown) {
         let text = 'İşlemde bir hata oluştu.';

         const error = _err as AxiosError;
         if (error.response && error.response.data && error.response.data.msg) {
            text = error.response.data.msg as string;
         }

         notification.Error({
            text
         });
      }
   }
   likeRequestLoading = false;
}
//#endregion
</script>

<template>
   <div ref="entryWrapper" class="entry-wrapper">
      <div class="entry-body">
         {{ props.entryData.body }}
      </div>
      <div class="entry-footer">
         <div class="entry-info">
            <RouterLink
               :to="{
                  name: 'Profile',
                  params: { username: entryData.username }
               }"
               v-text="entryData.username"
               class="link writer"
            />

            <RouterLink
               :to="entryURL"
               v-text="msToDateString(entryData.date)"
               role="time, link"
               class="link date"
            />
         </div>
         <div class="icon-section">
            <Icon
               @click="changeLike"
               :name="liked ? 'favorite' : 'favorite_border'"
               role="button"
               aria-label="beğen"
               title="beğen"
               class="button heart-icon"
            />
            <span
               v-if="props.entryData.likeCount > 0"
               @click="openModal"
               role="button"
               class="count"
               v-text="props.entryData.likeCount"
            />
            <Icon
               @click="
                  confirm.create({
                     text: 'entry silinecek, emin misiniz?',
                     onAccept: handleEntryDelete
                  })
               "
               v-if="canDelete"
               aria-label="sil"
               title="sil"
               role="button"
               class="button delete-icon"
               name="delete"
            />
         </div>
      </div>

      <Modal v-model:visible="isLikeModalOpen">
         <ModalLikes :users="likesOfEntry" @hide="isLikeModalOpen = false" />
      </Modal>

      <Modal v-model:visible="isDeleteModalOpen">
         <ModalConfirm
            @accept="handleEntryDelete"
            @deny="isDeleteModalOpen = false"
            text="entry silinecek, emin misiniz?"
         />
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
   text-align: left;

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
            font-size: 23px;
            color: colors.$ruby;
            margin-right: funcs.padding(1);
         }
         .count {
            color: colors.$ruby;
            box-shadow: 0px 0px 0px 1px rgba(colors.$ruby, 0.5);
            border-radius: vars.$radius;
            padding: 0 funcs.padding(2);
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
