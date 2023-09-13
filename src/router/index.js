import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'
import UsersView from '@/views/UsersView.vue'
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: "/login/",
    name: "Login",
    component: LoginView
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
