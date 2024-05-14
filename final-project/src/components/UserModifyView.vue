<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
console.log(userInfo)
const userName = ref(userInfo.userName)
const userPassword = ref('')
const userEmail = ref(userInfo.userEmail)
const userCheckPassword = ref('')
console.log(userName, userEmail)
// todo: 사진 수정
const update = () => {
  let updatedUserInfo = {
    isLogin: true,
    userRole: userInfo.userRole,
    userName: userName,
    userId: userInfo.userId,
    userPassword: userPassword,
    userEmail: userEmail,
    userProfileImageUrl: userInfo.userProfileImageUrl
  }
  sessionStorage.setItem('userInfo', JSON.stringify(updatedUserInfo))
  userStore.login(updatedUserInfo)
}
</script>
<template>
  <!-- todo: validate-->
  <div class="container orbit">
    <div class="modify-content">
      <div class="modify-header">
        <h1>회원 수정</h1>
      </div>
      <form class="modify-body">
        <div class="inputArea">
          <input type="text" class="formInput orbit" placeholder="이름" v-model="userName" />
        </div>
        <div class="inputArea">
          <input type="text" class="formInput orbit" v-model="userStore.userInfo.userId" disabled />
        </div>
        <div class="inputArea">
          <input
            type="password"
            class="formInput orbit"
            placeholder="비밀번호"
            v-model="userPassword"
          />
        </div>
        <div class="inputArea">
          <input
            type="password"
            class="formInput orbit"
            placeholder="비밀번호 확인"
            v-model="userCheckPassword"
          />
        </div>
        <div class="inputArea">
          <input type="email" class="formInput orbit" placeholder="이메일" v-model="userEmail" />
        </div>
        <div class="inputArea">
          <RouterLink to="/" class="modifyBtn orbit" @click="update">수정</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.modify-header {
  text-align: center;
}
.modify-content {
  width: 100%;
  max-width: 320px;
  border-radius: 20px;
  height: 75vh;
}

.inputArea {
  width: 80%;
  margin: 0 auto;
}

.formInput {
  width: 100%;
  aspect-ratio: 10/1;
  margin-top: 10px;
  border-radius: 20px;
  text-indent: 5%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-shadow: none;
  border: 1px solid rgb(192, 192, 192);
  font-size: small;
}
.modifyBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 10/1;
  margin-top: 10px;
  font-size: small;
  border-radius: 20px;
  border-width: 0;
  background-color: #ffe6ca;
}

a {
  text-decoration: none;
}
</style>
