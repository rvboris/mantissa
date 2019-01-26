import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import get from 'lodash/get';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/home.vue'),
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: () => import('./views/sign-in.vue'),
      meta: {
        guestOnly: true
      }
    },
    {
      path: '/sign-out',
      name: 'signOut'
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/register.vue'),
      meta: {
        guestOnly: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./views/dashboard.vue'),
      meta: {
        authRequired: true
      },
      children: [
        {
          path: '',
          name: 'operations',
          component: () => import('./views/dashboard/operations.vue')
        }
      ]
    },
    { path: '*', redirect: '/' }
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === 'signOut') {
    store.dispatch('user/signOut');
    return next({ name: 'home' });
  }

  if (to.matched.some(record => get(record, 'meta.authRequired'))) {
    if (!store.getters['user/isLoggedIn']) {
      return next({ name: 'signIn' });
    }
  }

  if (to.matched.some(record => get(record, 'meta.guestOnly'))) {
    if (store.getters['user/isLoggedIn']) {
      return next({ name: 'home' });
    }
  }

  next();
});
