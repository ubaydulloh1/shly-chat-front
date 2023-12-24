import { createRouter, createWebHistory } from 'vue-router'
import HomePageView from '../pages/HomePageView.vue'
import LoginPageView from '@/pages/LoginPageView.vue'
import RegisterPageView from '@/pages/RegisterPageView.vue'
import RegistrationFirstStepView from '@/components/Registration/FirstStepView.vue'
import RegistrationSecondStepView from '@/components/Registration/SecondStepView.vue'


import ResetPasswordView from '@/views/ResetPasswordView.vue'
import UsersView from '@/views/UsersView.vue'
import ChatWindowView from '@/components/ChatMessage/ChatWindowView.vue'
import AccountView from '@/views/AccountView.vue'
import EditProfileView from '@/components/Account/EditProfileView.vue'
import AccountSettingsView from '@/components/Account/AccountSettingsView.vue'
import AccountChangePasswordView from '@/components/Account/AccountChangePasswordView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NoChatSelectedView from '@/components/ChatMessage/NoChatSelectedView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePageView,
    children: [
      {
        path: '/',
        name: 'NoChatSelected',
        component: NoChatSelectedView,
        router: 'chatWindow'
      },
      {
        path: 'chat/:id/',
        name: 'chatWindow',
        component: ChatWindowView,
        router: 'chatWindow'
      },
    ]
  },

  {
    path: '/about/',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: "/login/",
    name: "Login",
    component: LoginPageView
  },
  {
    path: "/account/",
    name: "Account",
    component: AccountView,
    children: [
      {
        path: 'edit/',
        name: "EditProfile",
        component: EditProfileView,
      },
      {
        path: 'settings/',
        name: "AccountSettings",
        component: AccountSettingsView,
      },
      {
        path: 'change-password/',
        name: "AccountChangePassword",
        component: AccountChangePasswordView,
      },
    ]
  },
  {
    path: "/register/",
    name: "Register",
    component: RegisterPageView,
    children: [
      {
        path: "",
        name: "RegisterStepOne",
        component: RegistrationFirstStepView,
      },
      {
        path: "confirm/",
        name: "RegisterStepTwo",
        component: RegistrationSecondStepView,
      },
    ]
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
