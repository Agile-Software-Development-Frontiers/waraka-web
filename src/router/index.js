import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/auth/view/LoginView.vue"
import RegisterView from "../views/auth/view/RegisterView.vue"
import TheDashboardView from "../components/TheDashboardView.vue";
import UserProfile from "@/views/UserProfile.vue";
import DomainSettings from "@/views/domain/DomainSettings.vue";
import RegisterDomain from "@/views/domain/RegisterDomain.vue";

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
      {
        name: 'profile',
        path: 'profile',
        component: UserProfile,
        meta: {
          slug: 'User Profile',
        },
      },
      {
        name:'domain',
        path: 'domain',
        component: DomainSettings,
        meta: {
          slug: 'Domain Settings',
        },
        children : [
          {
            name: 'register-domain',
            path: 'register-domain',
            component: RegisterDomain,
            meta: {
              slug: 'Domain Settings',
            }
          }
        ]
      },
    ]
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;