<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useBoardStore } from '@/stores/boardStore'
import convertDateToString from '@/utils/convert_date_to_string'
const { boardState } = useBoardStore()
const boardStore = useBoardStore()

onMounted(async () => {
  await boardStore.listBoard()
})
const postClick = (board) => {
  boardState.board = board
  console.log(boardState.board)
  console.log(board)
}
const stripTags = (str) => {
  str = str.replace(/(<([^>]+)>)/gi, '') // 태그 제거
  str = str.replace(/\s\s+/g, ' ') // 연달아 있는 줄바꿈, 공백, 탭을 공백 1개로 줄임
  return str
}
</script>

<template>
  <div id="container">
    <RouterLink to="/boardWrite" class="writeBtnArea">
      <button>글쓰기</button>
    </RouterLink>
    <!-- todo: 글자수 넘어가면 말줄임표-->
    <div class="postList">
      <RouterLink
        v-for="(board, index) in boardState.boardList"
        :key="index"
        to="/boardDetail"
        class="post orbit"
        @click="postClick(board)"
      >
        <b class="title">{{ board.postTitle }}</b>
        <p class="contents">{{ stripTags(board.postContent) }}</p>
        <div class="info">
          {{ boardState.nicknameList[index] || '(알 수 없음)' }}
          | {{ convertDateToString(board.postTime) }} 전<br />
        </div>

        <div class="info infobottom">
          <!-- <div><img class="infoIcon" src="@/assets/img/comment.png" /></div> -->
          <!-- <div>{{ board.comments }}</div> -->
          <div><img class="infoIcon" src="@/assets/img/like.png" /></div>
          <div>{{ board.likeCount }}</div>
          <div><img class="infoIcon" src="@/assets/img/views.png" /></div>
          <div>{{ board.viewCount }}</div>
        </div>
      </RouterLink>
    </div>
    <div>
      <input type="text" />
      <button>검색</button>
    </div>
  </div>
</template>
<style scoped>
input:focus {
  outline: 1px solid #ffa967;
  border: none;
}
#container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
}
.postList {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 320px;
  margin-bottom: 30px;
}
.post {
  width: 100%;
  height: 100px;
  position: relative;
  border-bottom: 1px solid black;
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
  right: 0;
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
.writeBtnArea {
  width: 100%;
  max-width: 320px;
}
.writeBtnArea button {
  float: right;
}
a {
  text-decoration: none;
  color: black;
}
p,
b {
  display: block;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
