<script setup>
import { useUserStore } from '@/stores/userStore'
const { userInfo, updateUserPassword } = useUserStore()
import { ref } from 'vue'
const prePassword = ref('')
const newPassword = ref('')
const userPassword = ref('')

const updatePassword = () => {
  // if (prePassword.value !== userInfo.userPassword) return
  userInfo.password = userPassword.value
  console.log(userPassword.value)
  updateUserPassword()
  clear()
}
const clear = () => {
  prePassword.value = ''
  userPassword.value = ''
  newPassword.value = ''
}
</script>
<template>
  <div class="container orbit">
    <input type="password" placeholder="현재 비밀번호" v-model="prePassword" class="orbit" />
    <input type="password" placeholder="새 비밀번호" v-model="newPassword" class="orbit" />
    <input type="password" placeholder="비밀번호 확인" v-model="userPassword" class="orbit" />
    <div id="saveBtn" @click="updatePassword">변경하기</div>
  </div>
</template>

<style scoped>
input {
  width: 50%;
  height: 45px;
  border-radius: 20px;
  text-indent: 5%;
  border: 1px solid #dadada;
  font-size: small;
  margin-bottom: 3%;
}
input:focus {
  outline: 1px solid #ffa967;
  border: none;
}
#saveBtn {
  text-align: center;
  width: 50%;
  height: auto;
  border-radius: 20px;
  background-color: #ffe6ca;
  padding: 2% 0 2% 0;
}
#saveBtn:hover {
  cursor: pointer;
}
</style>
