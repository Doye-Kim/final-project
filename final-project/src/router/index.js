import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import TourView from '@/components/TourView.vue'
import BoardListView from '@/components/BoardListView.vue'
import JoinView from '@/components/JoinView.vue'
import BoardDetailView from '@/components/BoardDetailView.vue'
import BoardWriteView from '@/components/BoardWriteView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView
    },
    {
      path: '/tour',
      name: 'tour',
      component: TourView
    },
    {
      path: '/board',
      name: 'board',
      component: BoardListView
    },
    {
      path: '/join',
      name: 'join',
      component: JoinView
    },
    {
      path: '/boardDetail',
      name: 'boardDetail',
      component: BoardDetailView
    },
    {
      path: '/boardWrite',
      name: 'boardWrite',
      component: BoardWriteView
    }
  ]
})

export default router
