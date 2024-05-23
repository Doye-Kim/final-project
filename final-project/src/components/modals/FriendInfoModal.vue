<script setup>
import { useFriendStore } from '@/stores/friendStore'
const { addFriend, friendState } = useFriendStore()

import { useModalStore } from '@/stores/modalStore'
const modalStore = useModalStore()
const close = () => {
  modalStore.FriendInfoIsOpen = false
}
const addFriendClick = () => {
  addFriend()
  modalStore.FriendInfoIsOpen = false
}
</script>
<template>
  <div class="modal-dialog">
    <div class="modal-content orbit">
      <div class="modal-header">
        <img src="@/assets/img/close-btn.png" class="closeBtn" @click="close" />
      </div>
      <div class="modal-body">
        <img src="@/assets/img/userCircle.png" width="70px" />
        <div>{{ friendState.friend.userNickname }}</div>
        <div id="btnDiv"><button @click="addFriendClick" class="addBtn">추가</button></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal-dialog {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 200;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  /* background: rgba(0, 0, 0, 0.5); */
}
.modal-content {
  position: absolute;
  top: 20%;
  left: 50%;
  z-index: 205;
  width: 150px;
  transform: translate(-50%, -50%);
  padding: 20px;
  border: 1px solid #dadada;
  box-shadow: 2px 2px 5px gray;
  background: #ffffff;
  border-radius: 20px;
}

.closeBtn {
  position: absolute;
  width: 20px;
  right: 5%;
  top: 5%;
  cursor: pointer;
}

#btnDiv {
  margin-top: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.addBtn {
  width: 60px;
  padding: 7px;
  cursor: pointer;
  margin-top: 7px;
  font-size: small;
  border-radius: 20px;
  border-width: 0;
  box-shadow: 2px 2px 0 #c7c7c7;
  background-color: var(--maincolor);

  transition-property: all;
  transition-duration: 0.1s;
  transition-delay: 0s;
  transition-timing-function: ease-in;
}
.addBtn:hover {
  box-shadow: none;
  transform: translate(2px, 2px);
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
