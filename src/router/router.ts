import { usePromise } from 'vierone';
import { createRouter, createWebHistory, NavigationGuard } from 'vue-router';
import { GetUserAuthID, VerifyUser } from '../helpers/auth';
import { useAppStore } from '../stores/appStore';

const NoAuthHandle: NavigationGuard = async (to, from, next) => {
   const auth_id = GetUserAuthID();
   if (!auth_id) {
      next();
   } else {
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
         beforeEnter: [NoAuthHandle]
      }
   ]
});

export default router;
