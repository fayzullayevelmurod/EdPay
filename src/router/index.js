import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CreateLanding from '../views/CreateLanding.vue'
import DefaultHome from "../components/DefaultHome.vue"
import BestSchool from '../views/BestSchool.vue'

const routes = [
  {
    path: '/',
    name: 'DefaultHome',
    component: DefaultHome,
    children: [
      {path: '/', name: 'Home', component: Home},
      {path: 'create-landing', name: 'CreateLanding', component: CreateLanding},

    ]
  },
  {
    path: '/email',
    name: 'Email',
    component: function () {
      return import('../views/Email.vue')
    }
  },
  {
    path: '/bestschool',
    name: 'BestSchool',
    component: function () {
      return import('../views/BestSchool.vue')
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
