<script setup>
import { useFriendStore } from '@/stores/friendStore'
import { useMyStore } from '@/stores/myStore'
import { useAttractionStore } from '@/stores/attractionStore'

const { getBookmarkMarkers } = useAttractionStore()
const { friendState, getList } = useFriendStore()
const { getBookmarks } = useMyStore()
getList()
let userSeq = sessionStorage.getItem('userSeq')
let userNickname = sessionStorage.getItem('userNickname')
const onMarker = async (seq) => {
  try {
    await getBookmarks(seq)
    await getBookmarkMarkers()
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <div class="container">
    <ul class="friend-list orbit">
      <li class="friend-info" @click="onMarker(userSeq)">
        <span>{{ userNickname }}(My)</span>
      </li>
      <li
        v-for="(item, index) in friendState.friendList"
        :key="index"
        class="friend-info"
        @click="onMarker(item.toSeq)"
      >
        <span>{{ item.nickname }}</span>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.container {
  background-color: white;
  width: 150px;
  z-index: 200;
  border-radius: 20px;
  box-shadow: 2px 2px 3px gray;
  position: absolute;
  top: 35px;
  right: 10px;
}
.friend-list {
  height: 85%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  list-style-type: none;
}

.friend-list::-webkit-scrollbar {
  display: none;
}
.friend-info {
  font-size: small;
}
.friend-info :hover {
  color: gray;
  cursor: pointer;
}
</style>
