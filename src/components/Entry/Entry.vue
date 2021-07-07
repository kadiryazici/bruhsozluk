<script lang="ts">
type TemplateRef<T> = null | T;
</script>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted } from 'vue';
import { Modal } from 'modal-component-vue3';
import { usePromise } from 'vierone';

import type { AxiosError } from 'axios';
import type { EntryResponse } from '/src/api/types';

import ModalLikes from '/src/components/Modals/Likes/index.vue';
import ModalConfirm from '/src/components/Modals/Confirm/Confirm.vue';

import { getLikesOfEntry } from '/src/api/getLikesOfEntry';
import { useAppStore } from '/src/stores/appStore';
import { msToDateString } from '/src/helpers/app';
import { useNotificationStore } from '/src/stores/notificationStore';
import { deleteEntry } from '/src/api/deleteEntry';
import { postLikeEntry, postUnLikeEntry } from '/src/api/changeLike';

interface Emits {
   (event: 'atMount', value: HTMLElement): void;
}
interface Props {
   entryData: EntryResponse;
}

const emit = defineEmits<Emits>();
const props = defineProps<Props>();
const appStore = useAppStore();
const notificationStore = useNotificationStore();

ref: liked = props.entryData.didLike;
ref: likeRequestLoading = false;
ref: likesOfEntry = [] as string[];
ref: entryWrapper = null as TemplateRef<HTMLElement>;
ref: isModalOpen = false;
ref: isDeleteModalOpen = false;
ref: canDelete = computed(
   () =>
      appStore.isLogged &&
      appStore.userInformation.length > 0 &&
      (appStore.userInformation[0].isAdmin ||
         appStore.userInformation[0].username === props.entryData.username)
);

//#region Hooks
onMounted(() => {
   if (entryWrapper) {
      emit('atMount', entryWrapper);
   }
});
onBeforeUnmount(() => {
   isModalOpen = false;
});
//#endregion

//#region OpenModal
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
//#endregion

//#region Copy Entry Link
async function copyEntryLink() {
   const notifySuccess = () =>
      notificationStore.createNotification({
         kind: 'success',
         text: 'Entry adresi panoya kopyalandı.'
      });

   const notifyError = () =>
      notificationStore.createNotification({
         kind: 'error',
         text: 'Entry adresi panoya kopyalanamadı.'
      });

   const { id: entryID } = props.entryData;
   const { protocol, host } = window.location;
   const { header_id, page } = props.entryData;

   const url = `${protocol}//${host}/baslik/${header_id}/${page}?focus=${entryID}`;

   if ('clipboard' in navigator) {
      const [res, err] = await usePromise(navigator.clipboard.writeText(url));
      if (err) notifyError();
      else notifySuccess();
      return;
   } //
   else if ('execCommand' in document) {
      const _area = document.createElement('textarea');
      _area.style.left = '0px';
      _area.style.top = '0px';
      _area.style.position = 'fixed';
      _area.textContent = url;

      document.body.insertAdjacentElement('afterbegin', _area);
      _area.focus();
      _area.select();

      try {
         document.execCommand('copy');
         notifySuccess();
      } catch (error) {
         notifyError();
      }
      document.body.removeChild(_area);
      return;
   } //
   else {
      notifyError();
      return;
   }
}
//#endregion

//#region handleEntryDelete
async function handleEntryDelete() {
   const notify = notificationStore.createNotification;

   const notifySuccess = (text: string) => {
      notify({
         kind: 'success',
         text
      });
   };

   const notifyError = (text: string) => {
      notify({
         kind: 'error',
         text
      });
   };

   try {
      const { data: resData } = await deleteEntry({
         header_id: props.entryData.header_id,
         entry_id: props.entryData.id
      });
      notifySuccess(resData.msg);
      appStore.reloadRouterView();
   } catch (error) {
      const _error = () => error as AxiosError;
      if ((_error().response, _error().response!.data.msg)) {
         notifyError(_error().response!.data.msg as string);
      } //
      else {
         notifyError('Entry silinirken bir hata oluştu.');
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
         notificationStore.createNotification({
            kind: 'success',
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
         notificationStore.createNotification({ kind: 'error', text });
      }
   } else {
      try {
         const { data } = await postUnLikeEntry(requestBody);
         notificationStore.createNotification({
            kind: 'success',
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

         notificationStore.createNotification({
            kind: 'error',
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
               class="link writer"
               >{{ entryData.username }}</RouterLink
            >
            <span @click="copyEntryLink" role="time, link" class="link date">{{
               msToDateString(entryData.date)
            }}</span>
         </div>
         <div class="icon-section">
            <Icon
               role="button"
               aria-label="beğen"
               title="beğen"
               class="button heart-icon"
               @click="changeLike"
               :name="liked ? 'favorite' : 'favorite_border'"
            />
            <span
               v-if="props.entryData.likeCount > 0"
               @click="openModal"
               role="button"
               class="count"
               >{{ props.entryData.likeCount }}</span
            >
            <Icon
               aria-label="sil"
               title="sil"
               role="button"
               class="button delete-icon"
               name="delete"
               @click="isDeleteModalOpen = true"
               v-if="canDelete"
            />
         </div>
      </div>

      <Modal v-model:visible="isModalOpen">
         <ModalLikes :users="likesOfEntry" @hide="isModalOpen = false" />
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
