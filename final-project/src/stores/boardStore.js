import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const boardListContentStore = defineStore('boardContentStore', () => {
  const title = ref('')
  const name = ref('')
  const content = ref('')
  const time = new Date()

  return {
    title,
    content,
    time
  }
})
