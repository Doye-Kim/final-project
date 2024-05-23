import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modalStore', () => {
  const loginIsOpen = ref(false)
  const PasswordIsOpen = ref(false)
  const AddFriendIsOpen = ref(false)
  const FriendInfoIsOpen = ref(false)
  const AttractionIsOpen = ref(false)
  const FriendBookmarkIsOpen = ref(false)
  const SearchInputIsOpen = ref(false)
  const SearchResultIsOpen = ref(false)
  const datepickerIsOpen = ref(false)
  return {
    loginIsOpen,
    PasswordIsOpen,
    AddFriendIsOpen,
    FriendInfoIsOpen,
    AttractionIsOpen,
    FriendBookmarkIsOpen,
    SearchInputIsOpen,
    SearchResultIsOpen,
    datepickerIsOpen
  }
})
