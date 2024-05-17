import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/common/axios-config'

export const useValidateStore = defineStore('validateStore', () => {
  const nickname = ref('')
  const userId = ref('')
  const password = ref('')
  const phoneNumber = ref('')

  const validateNickname = (data) => {
    const validate = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/
    console.log(data)
    return validate.test(data)
  }

  return { nickname, userId, password, phoneNumber, validateNickname }
})
