<script setup>
import { RouterLink } from 'vue-router'
import LoginModal from './LoginModal.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
const { userInfo } = useUserStore()

import { useModalStore } from '@/stores/modalStore'
const modalStore = useModalStore()

const openLoginModal = () => (modalStore.isOpen = true)
const clickMenu = ref(false)
const toggleDropdown = () => (clickMenu.value = !clickMenu.value)
console.log(userInfo)
</script>

<template>
  <nav class="navbar">
    <div @click="toggleDropdown">
      <img src="@/assets/img/menu.png" class="navBtn" />
    </div>
    <RouterLink to="/"><img src="@/assets/img/logo2.png" width="80" /></RouterLink>
    <div class="expandItem" />
    <a id="info" href="/modify">
      <img :src="userInfo.userProfileImageUrl" class="navBtn" />
    </a>
    <div id="logoutArea" v-if="userInfo.isLogin">
      <RouterLink to="/" type="button" class="orbit">로그아웃</RouterLink>
    </div>
    <div id="loginArea" v-else>
      <button type="button" class="orbit" @click="openLoginModal">로그인</button>
    </div>
  </nav>
  <ul class="navbar-menu" v-show="clickMenu">
    <li>
      <RouterLink to="/tour" class="orbit" @click="toggleDropdown">지역별 관광 정보</RouterLink>
    </li>
    <li><RouterLink to="/board" class="orbit" @click="toggleDropdown">커뮤니티</RouterLink></li>
  </ul>
  <div v-if="modalStore.isOpen">
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
  background: #dadada;
  border-radius: 4px;
}
a {
  text-decoration: none;
  color: black;
}
</style>
