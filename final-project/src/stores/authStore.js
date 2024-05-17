import { reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/common/axios-config'

export const useAuthStore = defineStore('authStore', () => {
  //const isLogin = ref(sessionStorage.getItem('login') != null ? true : false)

  const authStore = reactive({
    // NavBar
    isLogin: sessionStorage.getItem('isLogin') != null ? true : false,

    // else
    userNickname: '',
    userSeq: 0,

    // Login
    userId: '',
    userPassword: ''
  })
  const setLogin = (payload) => {
    sessionStorage.setItem('isLogin', 'true')
    sessionStorage.setItem('userNickname', payload.userNickname)
    sessionStorage.setItem('userSeq', payload.userSeq)

    authStore.isLogin = payload.isLogin
    authStore.userName = payload.userName
    authStore.userProfileImageUrl = payload.userProfileImageUrl
    console.log(authStore)
  }
  const setLogout = () => {
    sessionStorage.removeItem('isLogin')
    sessionStorage.removeItem('userNickname')
    sessionStorage.removeItem('userSeq')

    authStore.isLogin = false
    authStore.userNickname = ''
    authStore.userSeq = 0
  }
  const logout = async () => {
    console.log('logout')
    try {
      let { data } = await axios.get('/logout')

      if (data.result == 'success') {
        setLogout()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return { authStore, setLogin, logout }
})
