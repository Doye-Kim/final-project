<script setup>
import { ref } from 'vue'
import axios from '@/common/axios-config'
import { useRouter } from 'vue-router'
const router = useRouter()
const userId = ref('')
const password = ref('')

import { useAuthStore } from '@/stores/authStore'
const { authStore, setLogin } = useAuthStore()

import { useModalStore } from '@/stores/modalStore'
const modalStore = useModalStore()

const login = async () => {
  const loginObj = {
    userId: userId.value,
    password: password.value
  }
  try {
    let { data } = await axios.post('/login', loginObj)

    if (data.result == 'success') {
      setLogin({
        isLogin: true,
        userNickname: data.userNickname,
        userSeq: data.userSeq
      })
      // 이동
      close()
    } else if (data.result == 'fail') {
      alert('아이디 또는 비밀번호를 확인하세요.')
    }
  } catch (error) {
    alert('로그인 과정에서 오류가 발생했습니다.')
  }
}

const close = () => {
  modalStore.loginIsOpen = false
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
            v-model="password"
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
