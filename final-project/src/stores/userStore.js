import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './authStore'
import axios from '@/common/axios-config'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('userStore', () => {
  const { logout } = useAuthStore()
  const router = useRouter()
  const userInfo = reactive({
    userSeq: '',
    userNickname: '',
    userPhone: '',
    password: '',
    role: '',
    allowSearchByPhone: '',
    isQuit: 0
  })
  const getUserNickname = async (userSeq) => {
    let { data } = await axios.get(`/users/${userSeq}`)
    return data.userNickname
  }
  const getUserInfo = async () => {
    let userSeq = sessionStorage.getItem('userSeq')
    let { data } = await axios.get(`/users/${userSeq}`)
    userInfo.userSeq = data.userSeq
    userInfo.userNickname = data.userNickname
    userInfo.userPhone = data.userPhone
    userInfo.password = data.password
    userInfo.role = data.role
    userInfo.allowSearchByPhone = data.allowSearchByPhone
    userInfo.isQuit = data.isQuit
  }
  const updateUserInfo = async () => {
    let updateUserObj = {
      userNickname: userInfo.userNickname,
      userPhone: userInfo.userPhone,
      allowSearchByPhone: userInfo.allowSearchByPhone ? 1 : 0
    }
    let { data } = await axios.put(`/users/${userInfo.userSeq}`, null, { params: updateUserObj })
    console.log(data)
    return data
  }
  const updateUserPassword = async () => {
    let updateUserObj = {
      password: userInfo.password
    }
    let { data } = await axios.put(`/users/${userInfo.userSeq}/password`, null, {
      params: updateUserObj
    })
    console.log(data)
    return data
  }

  const deleteUser = async () => {
    let { data } = await axios.post(`/users/${userInfo.userSeq}`)
    logout()
    router.push('/')
    return data
  }

  return { userInfo, getUserNickname, getUserInfo, updateUserInfo, updateUserPassword, deleteUser }
})
