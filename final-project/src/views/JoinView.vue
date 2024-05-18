<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
import { ref } from 'vue'
import axios from '@/common/axios-config'
import getMask from '@/utils/phonenumber_to_string'
// const validateStore = useValidateStore()
// const validateNickname = () => {
//   if (validateStore.validateNickname(validateStore.nickname.value)) console.log(true)
//   else console.log(false)
// }
const userId = ref('')
const password = ref('')
const userNickname = ref('')
const userPhone = ref('')
const allowSearchByPhone = ref()

const register = async () => {
  let registerObj = {
    userId: userId.value,
    userNickname: userNickname.value,
    userPhone: userPhone.value,
    password: password.value,
    allowSearchByPhone: allowSearchByPhone.value ? 1 : 0
  }
  try {
    let { data } = await axios.post('/users', registerObj)
    console.log(data)
    alert('회원 가입을 축하합니다. 로그인을 진행해 주세요.')
    router.push('/')
  } catch (error) {
    alert('가입에 오류가 발생했습니다.')
  }
}
// const phone = ref('')
const getPhoneMask = (data) => {
  let res = getMask(data)
  // phone.value = res
  userPhone.value = res
  console.log(userPhone.value)
}
</script>

<template>
  <!-- todo: validate-->
  <div class="container orbit">
    <div class="join-content">
      <div class="join-header">
        <h1>회원가입</h1>
      </div>
      <form class="join-body">
        <div class="inputArea">
          <input type="text" class="formInput orbit" v-model="userNickname" placeholder="닉네임" />
        </div>
        <div class="inputArea">
          <input type="text" class="formInput orbit" v-model="userId" placeholder="아이디" />
        </div>
        <div class="inputArea">
          <input type="password" class="formInput orbit" placeholder="비밀번호" />
        </div>
        <div class="inputArea">
          <input
            type="password"
            class="formInput orbit"
            v-model="password"
            placeholder="비밀번호 확인"
          />
        </div>
        <div class="inputArea">
          <input
            type="text"
            class="formInput orbit"
            v-model="userPhone"
            @keyup="getPhoneMask(userPhone)"
            placeholder="휴대폰 번호 입력"
          />
        </div>
        <div class="inputArea">
          <div class="formInput toggleArea orbit">
            <span>번호로 친구 추가 허용</span>
            <input type="checkbox" id="toggle" hidden v-model="allowSearchByPhone" />
            <label for="toggle" class="toggleSwitch">
              <span class="toggleButton"></span>
            </label>
          </div>
        </div>
        <div class="inputArea">
          <button class="joinBtn orbit" @click.prevent="register">회원 가입</button>
        </div>
        <div class="text-end inputArea">
          <p>
            해당 계정은 trip에서 제공하는 서비스를 모두 이용하실 수 있습니다. 가입 시, 서비스
            이용약관, 개인정보처리 방침에 동의하는 것으로 간주합니다.
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
input:focus {
  outline: 1px solid #ffa967;
  border: none;
}
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.toggleArea {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.formInput span {
  width: 80%;
}
.toggleSwitch {
  width: 30px;
  height: 15px;
  display: block;
  position: relative;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: 0 0 2px 1px rgba(0 0 0 / 15%);
  cursor: pointer;
  margin: 5px;
}

.toggleSwitch .toggleButton {
  width: 12px;
  height: 12px;
  position: absolute;
  top: 50%;
  left: 1px;
  transform: translateY(-50%);

  border-radius: 50%;
  background: #ffdd9e;
}

#toggle:checked ~ .toggleSwitch {
  background: #ffdd9e;
}

#toggle:checked ~ .toggleSwitch .toggleButton {
  left: calc(100% - 13px);
  background: #fff;
}

.toggleSwitch,
.toggleButton {
  transition: all 0.2s ease-in;
}
.join-header {
  text-align: center;
}
.join-content {
  width: 100%;
  max-width: 320px;
  border-radius: 20px;
}

.postList {
  display: flex;
  flex-direction: column;
  align-items: center;
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
.joinBtn {
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

.text-end {
  margin-top: 1%;
  text-align: center;
  font-size: x-small;
  margin-bottom: 30%;
}
a {
  color: grey;
}
</style>
