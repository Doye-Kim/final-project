import { ref } from 'vue'
import { defineStore } from 'pinia'
// import axios from '@/commom/axios-config'

export const useModalStore = defineStore('modalStore', () => {
  const isOpen = ref(false)
  return {
    isOpen
  }
})
