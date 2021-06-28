import { usePromise } from 'vierone';
import { createRouter, createWebHistory, NavigationGuard } from 'vue-router';
import { VerifyUser } from '/src/api/auth';
import { GetUserAuthID } from '/src/helpers/auth';
import { useAppStore } from '/src/stores/appStore';
import { useModalStore } from '/src/stores/modalStore';

const MustNotLoggedIn: NavigationGuard = async (to, from, next) => {
   const appStore = useAppStore();

   if (appStore.isLogged && appStore.userInformation.length > 0) {
      next({
         name: 'Home'
      });
   } else {
      const [res, err] = await usePromise(VerifyUser());
      if (err) {
         next();
      } else {
         next({
            name: 'Home'
         });
      }
   }
};

const MustLoggedIn: NavigationGuard = async (to, from, next) => {
   const appStore = useAppStore();
   if (appStore.isLogged && appStore.userInformation.length > 0) {
      next();
   } else {
      const [res, err] = await usePromise(VerifyUser());
      if (res) {
         next();
      } else {
         next({
            name: 'Home'
         });
      }
   }
};

const router = createRouter({
   history: createWebHistory(),
   linkActiveClass: 'vierone-link-active',

   scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition && to.name === 'Todo') {
         return { top: savedPosition.top };
      } else {
         return {
            top: 0
         };
      }
   },

   routes: [
      {
         path: '/',
         name: 'Home',
         component: () => import('/src/pages/Home.vue')
      },
      {
         path: '/baslik/:id/:page(\\d+)?',
         name: 'Header',
         component: () => import('/src/pages/Header.vue')
      },
      {
         path: '/login',
         name: 'Login',
         component: () => import('/src/pages/Login.vue'),
         beforeEnter: [MustNotLoggedIn]
      },
      {
         path: '/signup',
         name: 'Signup',
         component: () => import('/src/pages/Signup.vue'),
         beforeEnter: [MustNotLoggedIn]
      },
      {
         path: '/create_header',
         name: 'CreateHeader',
         component: () => import('/src/pages/CreateHeader.vue'),
         beforeEnter: [MustLoggedIn]
      }
   ]
});

router.beforeEach((to, from, next) => {
   const modalStore = useModalStore();
   modalStore.closeAllModals();
   next();
});

export default router;