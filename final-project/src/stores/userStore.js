import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/commom/axios-config'
import notLoginedUserProfileImageUrl from '/src/assets/img/userCircle.png'

export const useUserStore = defineStore('userStore', () => {
  const notLoginedUserInfo = {
    isLogin: false,
    userRole: '',
    userName: '',
    userId: '',
    userEmail: '',
    userProfilImageUrl: notLoginedUserProfileImageUrl
  }
  const userInfo = ref(notLoginedUserInfo)
  const login = (loginedUserInfo) => {
    console.log(loginedUserInfo)
    userInfo.value = loginedUserInfo
  }
  const logout = () => (userInfo.value = notLoginedUserInfo)

  return { userInfo, login, logout }
})
