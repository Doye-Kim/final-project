import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modalStore', () => {
  const loginIsOpen = ref(false)
  const PasswordIsOpen = ref(false)
  const AddFriendIsOpen = ref(false)
  const FriendInfoIsOpen = ref(false)
  return {
    loginIsOpen,
    PasswordIsOpen,
    AddFriendIsOpen,
    FriendInfoIsOpen
  }
})
