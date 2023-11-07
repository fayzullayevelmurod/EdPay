import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import DefaultHome from "@/components/DefaultHome.vue";
import EmailConfirm from '@/views/EmailConfirm.vue';
import CreateLanding from '@/views/CreateLanding.vue';

const routes = [
  {
    path: '/',
    name: 'DefaultHome',
    component: DefaultHome,
    children: [
      {path: '/', name: 'Home', component: Home},
      {path: 'email-confirm', name: "EmailConfirm", component: EmailConfirm},
      {path: 'create-landing', name: 'CreateLanding', component: CreateLanding},
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
