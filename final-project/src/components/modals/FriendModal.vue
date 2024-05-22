<script setup>
import { ref } from 'vue'
import { useFriendStore } from '@/stores/friendStore'
import getMask from '@/utils/phonenumber_to_string'
import FriendInfoModal from '@/components/modals/FriendInfoModal.vue'
import { useModalStore } from '@/stores/modalStore'
const modalStore = useModalStore()

const { friendState, searchFriendByNumber, getList, deleteFriend } = useFriendStore()
const number = ref('')
getList()
const getPhoneMask = (data) => {
  let res = getMask(data)
  number.value = res
  console.log(number.value)
}
const submit = () => {
  searchFriendByNumber(number.value)
  number.value = ''
}
</script>

<template>
  <div class="container">
    <div class="search-area">
      <input
        class="orbit"
        type="text"
        placeholder="전화번호로 친구 찾기"
        id="search-input"
        v-model="number"
        @keyup="getPhoneMask(number)"
        @keyup.enter="submit"
      />
    </div>
    <ul class="friend-list orbit">
      <li v-for="(item, index) in friendState.friendList" :key="index" class="friend-info">
        <span>{{ item.nickname }}</span>
        <img
          @click="deleteFriend(item.followSeq)"
          width="20px"
          src="@/assets/img/close-btn.png"
          class="deleteBtn"
        />
      </li>
    </ul>
    <FriendInfoModal v-if="modalStore.FriendInfoIsOpen" />
  </div>
</template>
<style scoped>
.container {
  background-color: white;
  width: 250px;
  height: 80%;
  z-index: 200;
  text-align: center;
  border-radius: 50px;
  box-shadow: 3px 3px 5px gray;
  position: fixed;
  bottom: 80px;
  right: 20px;
}
#search-input {
  height: 30px;
  margin-top: 30px;
  border-radius: 30px;
  border: 1px solid gray;
  background-image: url('@/assets/img/Search.png');
  background-repeat: no-repeat;
  background-position: 5px center;
  padding-left: 40px;
}
.friend-list {
  height: 85%;
  margin-top: 20px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.friend-list::-webkit-scrollbar {
  display: none;
}
.deleteBtn {
  cursor: pointer;
  position: absolute;
  right: 35px;
}
.friend-info {
  display: flex;
  align-items: center;
  margin-top: 5px;
}
</style>
