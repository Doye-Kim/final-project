<script setup>
import FriendModal from './modals/FriendModal.vue'
import { useModalStore } from '@/stores/modalStore'
import { useAuthStore } from '@/stores/authStore'
const { authStore } = useAuthStore()
const modalStore = useModalStore()
const click = () => {
  modalStore.AddFriendIsOpen = !modalStore.AddFriendIsOpen
}
</script>
<template>
  <div v-if="authStore.isLogin">
    <FriendModal v-if="modalStore.AddFriendIsOpen" />
    <div class="btn-background" @click="click">
      <img class="friend-icon" src="@/assets/img/user_add.png" width="35px" />
    </div>
  </div>
</template>
<style scoped>
.btn-background {
  width: 40px;
  height: 40px;
  text-align: center;
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: var(--maincolor);
  border-radius: 50%;
  box-shadow: 3px 3px 5px grey;
  cursor: pointer;
  z-index: 200;
}
.friend-icon {
  position: relative;
  top: 4px;
  left: 1px;
  width: 30px;
}
</style>
