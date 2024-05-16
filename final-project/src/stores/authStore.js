import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/common/axios-config'

export const useAuthStore = defineStore('authStore', () => {
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
    // getUserInfo(loginedUserId)
    isLogin.value = true
  }
  const logout = () => {
    sessionStorage.clear()
    userInfo.value = null
    isLogin.value = false
  }
  const getUserInfo = async (userId) => {
    // 목록
    // get /students
    try {
      let response = await axios.get(`/users/${userId}`)
      //console.log(response)
      // let data = await response.json()
      // console.log(data)

      let { data } = response
      userInfo.value = data
    } catch (error) {
      console.log(error)
    }
  }
  return { userInfo, isLogin, login, logout, getUserInfo }
})
