<script setup>
import { ref } from 'vue'
import AccountInformation from '@/components/mypage/AccountInformation.vue'
import MyPlace from '@/components/mypage/MyPlace.vue'
import MyActivity from '@/components/mypage/MyActivity.vue'
import MyPlan from '@/components/mypage/MyPlan.vue'
import { useMyStore } from '@/stores/myStore'
const { getBookmarks, getPlans, getPost, getCommentPost, getLikePost, myState, listState } =
  useMyStore()
const isSelected = ref(1)

const changeValue = (value) => {
  isSelected.value = value
}
const userSeq = sessionStorage.getItem('userSeq')
const bookmarkClick = async () => {
  changeValue(1)
}
const planClick = async () => {
  changeValue(2)
}
const postClick = async () => {
  changeValue(3)
  await getPost()
  listState.list = myState.myPost
}
const commentClick = async () => {
  changeValue(4)
  await getCommentPost()
  listState.list = myState.myCommentPost
}

const likeClick = async () => {
  changeValue(5)
  await getLikePost()
  listState.list = myState.myLikePost
}
import { useUserStore } from '@/stores/userStore'
const { getUserInfo, deleteUser } = useUserStore()
getUserInfo()
</script>
<template>
  <div class="container">
    <div class="menu orbit">
      <p class="category">관광지</p>
      <div class="hr" />
      <p class="list" :class="{ select: isSelected === 1 ? true : false }" @click="bookmarkClick">
        즐겨찾기 한 관광지
      </p>
      <p class="list" :class="{ select: isSelected === 2 ? true : false }" @click="planClick">
        나의 플랜
      </p>

      <p class="category">커뮤니티</p>
      <div class="hr" />
      <p class="list" :class="{ select: isSelected === 3 ? true : false }" @click="postClick">
        내가 쓴 글
      </p>
      <p class="list" :class="{ select: isSelected === 4 ? true : false }" @click="commentClick">
        댓글 단 글
      </p>
      <p class="list" :class="{ select: isSelected === 5 ? true : false }" @click="likeClick">
        좋아요 한 글
      </p>
      <div id="empty"></div>
      <p class="list" :class="{ select: isSelected === 6 ? true : false }" @click="changeValue(6)">
        계정 정보
      </p>
      <p class="list" @click="deleteUser">탈퇴</p>
    </div>
    <div class="detail">
      <MyPlace v-show="isSelected === 1" />
      <MyPlan v-show="isSelected === 2" />
      <MyActivity v-show="isSelected === 3 || isSelected === 4 || isSelected === 5" />
      <AccountInformation v-if="isSelected === 6" />
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 90vh;
}
.category {
  margin-top: 20%;
  font-size: small;
}
.select {
  color: var(--maincolor);
  font-weight: bold;
}
.list {
  cursor: pointer;
  width: 90%;
  padding: 2%;
}
.menu {
  width: 25%;
}
.detail {
  width: 60%;
  padding: 2%;
}
.hr {
  width: 90%;
  border: #dadada solid 1px;
}
#empty {
  height: 15%;
}
</style>
