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

export const newRouter = () => {
   const router = createRouter({
      history: createWebHistory(),
      linkActiveClass: 'vierone-link-active',

      scrollBehavior: (to, from, savedPosition) => {
         return new Promise((resolve, reject) => {
            if (to.name == 'Header' && to.query.focus) {
               resolve(undefined);
               return;
            }

            setTimeout(() => {
               let top = 0;
               if (savedPosition) {
                  top = savedPosition.top;
               }
               window.scroll({
                  top,
                  behavior: 'smooth'
               });
               resolve(undefined);
            }, 500);
         });
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
         },
         {
            path: '/user/:username',
            name: 'Profile',
            component: () => import('/src/pages/Profile.vue')
         },
         {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: () => import('/src/pages/404.vue')
         }
      ]
   });
   router.beforeEach((to, from, next) => {
      const modalStore = useModalStore();
      modalStore.closeAllModals();
      next();
   });

   router.beforeResolve(to => {
      if (to.name && typeof to.name === 'string') {
         const appStore = useAppStore();
         appStore.routerHistoryNames.push(to.name);
      }
   });
   return router;
};
