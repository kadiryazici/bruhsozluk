<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Head } from '@vueuse/head';
import type { AxiosError } from 'axios';

import Title from '/src/components/Title/Title.vue';
import { fixURLUsername, sanitizeUserName } from '/src/helpers/app';
import type { GetUserResponse } from '/src/api/types';
import { getUser } from '/src/api/getUser';
import { useNotificationStore } from '/src/stores/notificationStore';
import ProfileEntry from '/src/components/Profile/ProfileEntry.vue';
import type { Colors } from '/src/components/Button/Button.vue';

const route = useRoute();
const router = useRouter();
const notification = useNotificationStore();

const userData: GetUserResponse[] = reactive([]);
ref: entryPage = 0;
ref: isLoadingNewEntries = false;
ref: userName = computed((): string => {
   const username = route.params.username;
   if (username && typeof username === 'string') {
      return sanitizeUserName(
         userData.length > 0 ? userData[0].username : username
      );
   } else {
      return 'Kullanıcı Adı';
   }
});

onMounted(async () => {
   try {
      const { data } = await getUser(fixURLUsername(userName));
      userData.length = 0;
      userData.push(data);
      entryPage = data.currentPage;
   } catch (error: unknown) {
      const err = error as AxiosError;
      if (err.response && err.response.data.msg) {
         notification.createNotification({
            kind: 'error',
            text: err.response.data.msg as string
         });
      }
      router.push({
         name: 'Home'
      });
   }
});

async function loadNextPage() {
   if (userData.length) {
      const [user] = userData;
      const { totalPage } = user;
      if (entryPage < totalPage) {
         isLoadingNewEntries = true;
         const {
            data: { entries }
         } = await getUser(fixURLUsername(userName), entryPage + 1);
         userData[0].entries.push(...entries);
         entryPage += 1;
      }
      isLoadingNewEntries = false;
   }
}

ref: loadMoreButtonProps = computed(() => ({
   onClick: loadNextPage,
   loading: isLoadingNewEntries,
   size: '12px',
   textColor: 'primary' as Colors,
   color: 'turq' as Colors
}));
</script>

<template>
   <div id="profile">
      <template v-if="!userData.length"> Yüklenmece </template>

      <template v-for="user in userData" v-else>
         <Head>
            <title>{{ `${user.username} | Bruhsözlük` }}</title>
         </Head>

         <Title class="title">
            <template #icon>
               <Icon name="person" />
            </template>
            {{ userName }}
            <div v-if="user.isAdmin" class="username-banner">moderatör</div>
         </Title>

         <div class="user-details">
            <div
               class="detail"
               v-for="detail in [
                  `Toplam Entry Sayısı: ${user.totalEntry}`,
                  ` Toplam Beğendiği Entry: ${user.totalLikes}`
               ]"
            >
               <Icon class="icon" name="radio_button_checked" /> {{ detail }}
            </div>
         </div>

         <div class="user-entries">
            <Title seperator class="title">
               <template #icon>
                  <Icon name="article" />
               </template>
               entryler
            </Title>

            <ProfileEntry
               :key="entry.entry.id"
               :data="entry"
               v-for="entry in user.entries"
            />
            <VButton
               v-bind="loadMoreButtonProps"
               v-if="entryPage < user.totalPage"
               class="loadMore"
            >
               <Icon class="_icon" name="keyboard_arrow_down" /> Daha Fazla
            </VButton>
         </div>
      </template>
   </div>
</template>

<style lang="scss" scoped>
#profile {
   color: colors.$secondary;

   .title {
      .username-banner {
         font-size: 10px;
         display: inline-block;
         padding: funcs.padding(0.5) funcs.padding(1);
         border-radius: vars.$radius;
         margin-left: funcs.padding(2);
         border: 1px solid colors.$turq;
         color: colors.$turq;
      }
   }

   .user-details {
      margin-bottom: funcs.padding(6);
      .title {
         margin-bottom: funcs.padding(5);
      }
      .detail {
         color: colors.$lightDark;
         font-size: 12px;
         margin-bottom: funcs.padding(1);
         display: flex;
         width: 100%;
         align-items: center;

         .icon {
            &,
            & * {
               font-size: 10px;
               color: colors.$turq;
               margin-right: funcs.padding(1);
            }
         }
      }
   }

   .user-entries {
      text-align: center;
      .title {
         margin-bottom: funcs.padding(5);
      }

      .loadMore {
         ._icon {
            margin-right: funcs.padding(1);
         }
      }
   }
}
</style>
