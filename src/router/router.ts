import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
   history: createWebHistory(),
   linkActiveClass: 'vierone-link-active',

   scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition && to.name === 'Todo') {
         return { top: savedPosition.top };
      } else {
         return {
            top: 0,
         };
      }
   },

   routes: [
      {
         path: '/',
         name: 'Home',
         component: () => import('/src/pages/Home.vue'),
      },
      {
         path: '/baslik',
         name: 'Header',
         component: () => import('/src/pages/Header.vue'),
      },
      {
         path: '/login',
         name: 'Login',
         component: () => import('/src/pages/Login.vue'),
      },
   ],
});

export default router;
