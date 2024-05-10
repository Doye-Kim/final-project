import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const userInfoStore = defineStore('userInfoStore', () => {
  const name = ref('')

  return {
    name
  }
})
