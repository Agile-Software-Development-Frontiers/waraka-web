import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/auth/view/LoginView.vue"
import RegisterView from "../views/auth/view/RegisterView.vue"
import TheDashboardView from "../components/TheDashboardView.vue";

const routes = [
  {
    name:'register',
    path: '/register',
    component: RegisterView,
    requiresAuth: true,
    roles: ['admin', 'store_owner'],
    meta: {
      slug: 'User Registration',
    },
  },
  {
    name:'login',
    path: '/',
    component: LoginView,
    meta: {
      slug: 'Login',
    },
  },
  {
    name:'dashboard',
    path:'/dashboard',
    component: TheDashboardView,
    requiresAuth: true,
    roles: ['admin', 'store_owner'],
    meta: {
      slug: 'Dashboard',
    },

    children :[

    ]
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;