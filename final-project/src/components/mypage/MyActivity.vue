<script setup>
import { RouterLink } from 'vue-router'
import { useMyStore } from '@/stores/myStore'

import convertDateToString from '@/utils/convert_date_to_string'
const { listState } = useMyStore()
import { useBoardStore } from '@/stores/boardStore'
const { boardState } = useBoardStore()
const postClick = (board) => {
  boardState.board = board
}
const stripTags = (str) => {
  str = str.replace(/(<([^>]+)>)/gi, '') // 태그 제거
  str = str.replace(/\s\s+/g, ' ') // 연달아 있는 줄바꿈, 공백, 탭을 공백 1개로 줄임
  return str
}
</script>

<template>
  <div>
    <div class="postList">
      <RouterLink
        v-for="board in listState.list"
        :key="board.postSeq"
        to="/boardDetail"
        class="post orbit"
        @click="postClick(board)"
      >
        <b class="title">{{ board.postTitle }}</b>
        <p class="contents">{{ stripTags(board.postContent) }}</p>
        <div class="info">{{ convertDateToString(board.postTime) }} 전<br /></div>

        <!-- <div class="info infobottom">
          <div><img class="infoIcon" src="@/assets/img/like.png" /></div>
          <div>{{ board.likeCount }}</div>
          <div><img class="infoIcon" src="@/assets/img/views.png" /></div>
          <div>{{ board.viewCount }}</div>
        </div> -->
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.postList {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-bottom: 30px;
}
.post {
  width: 100%;
  height: 70px;
  position: relative;
  border-radius: 20px;
  border: 1px solid #dadada;
  margin-bottom: 10px;
}
.post > * {
  position: absolute;
}
.title {
  margin: 10px;
}
.contents {
  margin: 10px;
  top: 20px;
  color: grey;
}
.info {
  display: flex;
  font-size: small;
  right: 10px;
  top: 10px;
}
.infoIcon {
  width: 10px;
  height: 10px;
  margin: 5px;
}
.infobottom {
  top: 60px;
}
a {
  text-decoration: none;
  color: black;
}
p,
b {
  display: block;
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
