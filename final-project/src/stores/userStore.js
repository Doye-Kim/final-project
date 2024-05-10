import { ref } from 'vue'
import { defineStore } from 'pinia'
// import axios from '@/commom/axios-config'
import notLoginedUserProfileImageUrl from '/src/assets/img/userCircle.png'

export const useUserStore = defineStore('userStore', () => {
  const notLoginedUserInfo = {
    isLogin: false,
    userRole: '',
    userName: 'base',
    userId: '',
    userEmail: '',
    userPassword: '',
    userProfileImageUrl: notLoginedUserProfileImageUrl
  }

  const userInfo = ref(notLoginedUserInfo)
  console.log(userInfo)
  const login = (loginedUserInfo) => {
    console.log(loginedUserInfo)
    userInfo.value = loginedUserInfo
  }
  const logout = () => (userInfo.value = notLoginedUserInfo)

  return { userInfo, login, logout, notLoginedUserInfo }
})
