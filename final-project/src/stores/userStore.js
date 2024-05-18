import { reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/common/axios-config'

export const useUserStore = defineStore('userStore', () => {
  const userInfo = reactive({
    userSeq: '',
    userNickname: '',
    userPhone: '',
    password: '',
    role: '',
    allowSearchByPhone: '',
    isQuit: 0
  })
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
  return { userInfo, getUserInfo, updateUserInfo, updateUserPassword }
})
