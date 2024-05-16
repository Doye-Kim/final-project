<script setup>
import { RouterLink } from 'vue-router'
import LoginModal from '@/components/modals/LoginModal.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
const { userInfo } = useAuthStore()

import { useModalStore } from '@/stores/modalStore'
const authStore = useAuthStore()
const modalStore = useModalStore()

const openLoginModal = () => {
  console.log('open')
  modalStore.loginIsOpen = true
}
const clickMenu = ref(false)
const toggleDropdown = () => (clickMenu.value = !clickMenu.value)
// const closeDropdown = () => {
//   console.log('close')
//   clickMenu.value = false
// }
console.log(userInfo)
</script>

<template>
  <nav class="navbar">
    <div @click="toggleDropdown">
      <img src="@/assets/img/menu.png" class="navBtn" />
    </div>
    <RouterLink to="/"><img src="@/assets/img/logo2.png" width="80" /></RouterLink>
    <div class="expandItem" />

    <div id="logoutArea" v-show="authStore.isLogin">
      <a id="info" href="/mypage">
        <img src="@/assets/img/userCircle.png" class="navBtn" />
      </a>
      <button type="button" class="orbit" @click="authStore.logout">로그아웃</button>
    </div>
    <div id="loginArea" v-show="!authStore.isLogin">
      <button type="button" class="orbit" @click="openLoginModal">로그인</button>
    </div>
  </nav>
  <ul class="navbar-menu" v-show="clickMenu">
    <li>
      <RouterLink to="/tour" class="orbit" @click="toggleDropdown">지도</RouterLink>
    </li>
    <li><RouterLink to="/board" class="orbit" @click="toggleDropdown">커뮤니티</RouterLink></li>
  </ul>
  <div v-if="modalStore.loginIsOpen">
    <LoginModal />
  </div>
</template>
<style scoped>
button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1rem;
}
.navbar {
  display: flex;
  align-items: center;
  padding: 8px 12px;
}
.expandItem {
  flex: 1 0 auto;
  height: 10px;
}
.navBtn {
  width: 30px;
  margin-right: 10px;
  cursor: pointer;
  display: inline-flex;
}
.navbar-menu {
  list-style: none;
  padding-left: 0;
  top: 70px;
  display: flex;
  position: absolute;
  margin: 0 0 0 1%;
  padding: 0.5%;
  z-index: 100;
  float: left;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5%;
  box-shadow: 4px 4px 10px #c5b0b0;
  animation: fade-in 1s ease;
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.navbar-menu li {
  list-style-type: none;
  padding-left: 0;
  margin-left: 0;
  font-size: small;
  width: 100%;
  max-width: 200px;
  padding: 1%;
}
.navbar-menu :hover {
  color: gray;
}
a {
  text-decoration: none;
  color: black;
}
</style>
