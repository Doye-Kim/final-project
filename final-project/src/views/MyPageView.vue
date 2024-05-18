<script setup>
import { ref } from 'vue'
import AccountInformation from '@/components/mypage/AccountInformation.vue'
import MyPlace from '@/components/mypage/MyPlace.vue'
import MyActivity from '@/components/mypage/MyActivity.vue'
import MyPlan from '@/components/mypage/MyPlan.vue'
const isSelected = ref(1)
const changeValue = (value) => {
  isSelected.value = value
}
</script>
<template>
  <div class="container">
    <div class="menu orbit">
      <p class="category">관광지</p>
      <div class="hr" />
      <p class="list" :class="{ select: isSelected === 1 ? true : false }" @click="changeValue(1)">
        즐겨찾기 한 관광지
      </p>
      <p class="list" :class="{ select: isSelected === 2 ? true : false }" @click="changeValue(2)">
        나의 플랜
      </p>

      <p class="category">커뮤니티</p>
      <div class="hr" />
      <p class="list" :class="{ select: isSelected === 3 ? true : false }" @click="changeValue(3)">
        내가 쓴 글
      </p>
      <p class="list" :class="{ select: isSelected === 4 ? true : false }" @click="changeValue(4)">
        댓글 단 글
      </p>
      <div id="empty"></div>
      <p class="list" :class="{ select: isSelected === 5 ? true : false }" @click="changeValue(5)">
        계정 정보
      </p>
      <p class="list">탈퇴</p>
    </div>
    <div class="detail">
      <MyPlace v-show="isSelected === 1" />
      <MyPlan v-show="isSelected === 2" />
      <MyActivity v-show="isSelected === 3 || isSelected === 4" />
      <AccountInformation v-show="isSelected === 5" />
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
  color: #ffa967;
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
