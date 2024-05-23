<script setup>
import getMask from '@/utils/phonenumber_to_string'
import { useUserStore } from '@/stores/userStore'
const { userInfo, updateUserInfo } = useUserStore()
import { ref } from 'vue'
const userNickname = ref(userInfo.userNickname)
const userPhone = ref(userInfo.userPhone)
const allowSearchByPhone = ref(userInfo.allowSearchByPhone)
const getPhoneMask = (data) => {
  let res = getMask(data)
  userPhone.value = res
}

const updateUser = () => {
  userInfo.userNickname = userNickname.value
  userInfo.userPhone = userPhone.value
  userInfo.allowSearchByPhone = allowSearchByPhone.value
  updateUserInfo()
}
</script>
<template>
  <div class="orbit container">
    <div class="box nickname">
      <div class="title">닉네임</div>
      <div class="form"><input type="text" v-model="userNickname" class="orbit" /></div>
    </div>
    <div class="box phone">
      <div class="title">휴대폰 번호</div>
      <div class="form">
        <input type="text" v-model="userPhone" class="orbit" @keyup="getPhoneMask(userPhone)" />
      </div>
    </div>
    <div class="box allowphone">
      <div class="toggleArea">
        <span>번호로 친구 추가 허용</span>
        <input type="checkbox" id="toggle" hidden v-model="allowSearchByPhone" />
        <label for="toggle" class="toggleSwitch">
          <span class="toggleButton"></span>
        </label>
      </div>
    </div>
    <div id="saveBtn" @click="updateUser">변경 사항 저장하기</div>
  </div>
</template>

<style scoped>
/* input:focus {
  outline: 1px solid #ffa967;
  border: none;
} */
.box {
  width: 50%;
  height: auto;
  border-radius: 20px;
  border: #dadada solid;
  padding: 3%;
  margin-bottom: 20px;
}
#saveBtn {
  text-align: center;
  width: 50%;
  height: auto;
  border-radius: 20px;
  background-color: var(--maincolor);
  padding: 2% 3% 2% 3%;
  margin-bottom: 20px;
}
#saveBtn:hover {
  cursor: pointer;
}
.form {
  width: 100%;
  height: 100%;
  padding: 5% 5% 0 0;
  display: flex;
  justify-content: center;
}
.nickname input {
  width: 70%;
  height: 45px;
  border-radius: 20px;
  text-indent: 5%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-shadow: none;
  border: 1px solid #dadada;
  font-size: small;
}
.phone input {
  width: 100%;
  height: 45px;

  border-radius: 20px;
  text-indent: 5%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-shadow: none;
  border: 1px solid #dadada;
  font-size: small;
}
.toggleArea {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.toggleArea span {
  width: 80%;
}
.toggleSwitch {
  width: 50px;
  height: 30px;
  display: block;
  position: relative;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: 0 0 2px 1px rgba(0 0 0 / 15%);
  cursor: pointer;
  margin: 5px;
}

.toggleSwitch .toggleButton {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 50%;
  left: 1px;
  transform: translateY(-50%);

  border-radius: 50%;
  background: var(--maincolor);
}

#toggle:checked ~ .toggleSwitch {
  background: var(--maincolor);
}

#toggle:checked ~ .toggleSwitch .toggleButton {
  left: calc(100% - 26px);
  background: #fff;
}

.toggleSwitch,
.toggleButton {
  transition: all 0.2s ease-in;
}
</style>
