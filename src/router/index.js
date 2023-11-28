import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'
import UsersView from '@/views/UsersView.vue'
import AccountView from '@/views/AccountView.vue'
import EditProfileView from '@/components/Account/EditProfileView.vue'
import AccountSettingsView from '@/components/Account/AccountSettingsView.vue'
import AccountChangePasswordView from '@/components/Account/AccountChangePasswordView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about/',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: "/login/",
    name: "Login",
    component: LoginView
  },
  {
    path: "/account/",
    name: "Account",
    component: AccountView,
    children: [
      {
        path: '/account/edit/',
        name: "EditProfile",
        component: EditProfileView,
      },
      {
        path: '/account/settings/',
        name: "AccountSettings",
        component: AccountSettingsView,
      },
      {
        path: '/account/change-password/',
        name: "AccountChangePassword",
        component: AccountChangePasswordView,
      },
    ]
  },
  {
    path: "/register/",
    name: "Register",
    component: RegisterView
  },
  {
    path: "/reset-password/",
    name: "ResetPassword",
    component: ResetPasswordView
  },
  {
    path: "/users",
    name: "Users",
    component: UsersView
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
