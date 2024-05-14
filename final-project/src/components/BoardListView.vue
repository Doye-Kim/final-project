<script setup>
import { RouterLink } from 'vue-router'
import { boardListContentStore } from '@/stores/boardStore'
import { useUserStore } from '@/stores/userStore'
import convertDateToString from '@/utils/convert_date_to_string'
const userStore = useUserStore()
const { boardState } = boardListContentStore()
const boardStore = boardListContentStore()
boardStore.listBoard()
const postClick = (board) => {
  boardState.board = board
  console.log(boardState.board)
  console.log(board)
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
        v-for="board in boardState.boardList"
        :key="board.boardId"
        to="/boardDetail"
        class="post orbit"
        @click="postClick(board)"
      >
        <b class="title">{{ board.title }}</b>
        <p class="contents">{{ board.content }}</p>
        <div class="info">
          {{ userStore.userInfo.userName }}
          | {{ convertDateToString(board.time) }} 전<br />
        </div>

        <div class="info infobottom">
          <div><img class="infoIcon" src="@/assets/img/comment.png" /></div>
          <div>7</div>
          <div><img class="infoIcon" src="@/assets/img/like.png" /></div>
          <div>13</div>
          <div><img class="infoIcon" src="@/assets/img/views.png" /></div>
          <div>75</div>
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
