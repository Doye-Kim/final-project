import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import TourView from '@/views/TourView.vue'
import BoardListView from '@/views/board/BoardListView.vue'
import JoinView from '@/views/JoinView.vue'
import BoardDetailView from '@/views/board/BoardDetailView.vue'
import BoardWriteView from '@/views/board/BoardWriteView.vue'
import MyPageView from '@/views/MyPageView.vue'
import FindPasswordView from '@/views/FindPasswordView.vue'
import BoardUpdateView from '@/views/board/BoardUpdate.vue'

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
    },
    {
      path: '/boardUpdate',
      name: 'boardUpdate',
      component: BoardUpdateView
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPageView
    },
    {
      path: '/findPassword',
      name: 'findPassword',
      component: FindPasswordView
    }
  ]
})

export default router
