<script setup>
import { ref } from 'vue'

const userId = ref('')
const userPassword = ref('')

import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
console.log(userInfo)
import { useModalStore } from '@/stores/modalStore'
const modalStore = useModalStore()

import loginedUserProfileImageUrl from '/src/assets/img/123.jpg'

const login = () => {
  console.log(userId.value, userPassword.value)

  if (userId.value == 'ssafy' && userPassword.value == '1234') {
    let loginedUserInfo = {
      isLogin: true,
      userRole: 'user',
      userName: 'ssafy',
      userId: 'ssafy',
      userPassword: '1234',
      userProfileImageUrl: loginedUserProfileImageUrl
    }
    sessionStorage.setItem('userInfo', JSON.stringify(loginedUserInfo))
    userStore.login(loginedUserInfo)
    close()
  } else alert('로그인 실패')
}

const close = () => {
  modalStore.isOpen = false
}
</script>
<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <img src="@/assets/img/close-btn.png" class="closeBtn" @click="close" />
        <div class="logo">
          <img src="@/assets/img/logo2.png" />
        </div>
      </div>
      <form class="modal-body">
        <div class="inputArea">
          <input type="text" class="formInput orbit" placeholder="id " v-model="userId" />
        </div>
        <div class="inputArea">
          <input
            type="password"
            class="formInput orbit"
            placeholder="password"
            v-model="userPassword"
          />
        </div>
        <div class="inputArea">
          <div class="loginBtn orbit" @click="login">login</div>
        </div>
        <div class="text-end">
          <RouterLink to="/users/findPW" class="orbit" @click="close">비밀번호 찾기</RouterLink> |
          <RouterLink to="/join" class="orbit" @click="close">회원 가입</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
.modal-dialog {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
}
.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: #ffffff;
  border-radius: 20px;
}

.closeBtn {
  position: absolute;
  width: 30px;
  right: 2%;
  top: 2%;
  cursor: pointer;
}
.logo {
  text-align: center;
}
.logo img {
  width: 25%;
}
.inputArea {
  width: 80%;
  margin: 0 auto;
}
/* todo: 크기 반응형으로 변경 */
.formInput {
  width: 100%;
  aspect-ratio: 13/1;
  margin-top: 10px;
  border-radius: 20px;
  text-indent: 5%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-shadow: none;
  border-width: 0;
  font-size: small;
  background-color: rgba(217, 217, 217, 50);
}
.loginBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  aspect-ratio: 13/1;
  margin-top: 10px;
  font-size: small;
  border-radius: 20px;
  border-width: 0;
  background-color: #ffe6ca;
}
/* input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-shadow: none;
  border-width: 0;
  background-color: rgba(217, 217, 217, 50);
} */
.text-end {
  margin-top: 2%;
  text-align: center;
  font-size: x-small;
}
a {
  color: grey;
}
</style>
