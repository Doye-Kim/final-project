import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  const nowUserInfo = {
    userSeq: 1,
    password: '1234',
    userId: 'ssafy',
    userNickname: '싸피',
    role: 'admin',
    isQuit: 0,
    userPhone: '010-1111-1111'
  }

  const userInfo = ref()
  const isLogin = ref(sessionStorage.getItem('login') != null ? true : false)
  console.log(userInfo)
  const login = (loginedUserId) => {
    console.log(loginedUserId)
    userInfo.value = nowUserInfo
    isLogin.value = true
  }
  const logout = () => {
    sessionStorage.clear()
    userInfo.value = null
    isLogin.value = false
  }

  return { userInfo, isLogin, login, logout }
})
