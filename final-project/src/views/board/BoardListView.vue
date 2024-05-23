<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useBoardStore } from '@/stores/boardStore'
import convertDateToString from '@/utils/convert_date_to_string'

const boardStore = useBoardStore()
const { boardState } = boardStore

const totalCount = ref(0)
const currentPage = ref('')
const totalPages = ref('')
const itemsPerPage = 10

const calculateTotalPages = () => {
  totalPages.value = Math.ceil(totalCount.value / itemsPerPage)
  console.log(totalPages.value)
}

onMounted(async () => {
  totalCount.value = await boardStore.getTotalCount()
  await boardStore.listBoard(0)
  calculateTotalPages()
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

const movePage = async (pageIndex) => {
  if (pageIndex < 1 || pageIndex > totalPages.value) return
  currentPage.value = pageIndex
  const offset = (pageIndex - 1) * itemsPerPage
  await boardStore.listBoard(offset)
}
</script>

<template>
  <div id="container">
    <RouterLink to="/boardWrite" class="writeBtnArea">
      <button>글쓰기</button>
    </RouterLink>
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

        <div class="info info-bottom">
          <img class="likeIcon" src="@/assets/img/like.png" />
          <div>{{ board.likeCount }}</div>
          <img class="viewIcon" src="@/assets/img/views.png" />
          <div>{{ board.viewCount }}</div>
        </div>
      </RouterLink>
    </div>
    <div class="pagination">
      <button @click="movePage(1)" :disabled="currentPage.value === 1">처음</button>
      <button @click="movePage(currentPage.value - 1)" :disabled="currentPage.value === 1">
        이전
      </button>
      <button
        v-for="page in totalPages.value"
        :key="page"
        @click="movePage(page)"
        :class="{ active: page === currentPage.value }"
      >
        {{ page }}
      </button>
      <button
        @click="movePage(currentPage.value + 1)"
        :disabled="currentPage.value === totalPages.value"
      >
        다음
      </button>
      <button
        @click="movePage(totalPages.value)"
        :disabled="currentPage.value === totalPages.value"
      >
        끝
      </button>
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
  top: 25px;
  font-size: small;
  color: grey;
}
.info {
  display: flex;
  font-size: small;
  right: 0;
  top: 10px;
  align-items: center;
}
.likeIcon {
  width: 17px;
  height: 17px;
  margin: 5px;
}
.viewIcon {
  width: 10px;
  height: 7px;
  margin: 5px;
}
.info-bottom {
  top: 70px;
}
.writeBtnArea {
  width: 100%;
  max-width: 320px;
}
.writeBtnArea button {
  float: right;
  width: 60px;
  padding: 7px;
  cursor: pointer;
  margin-top: 7px;
  font-size: small;
  border-radius: 20px;
  border-width: 0;
  background-color: var(--maincolor);

  transition-property: all;
  transition-duration: 0.1s;
  transition-delay: 0s;
  transition-timing-function: ease-in;
}

.writeBtnArea button:hover {
  background-color: white;
  box-shadow: 0 0 0 1.5px var(--maincolor) inset;
}
a {
  text-decoration: none;
  color: black;
}
p {
  display: -webkit-box;
  width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
b {
  display: block;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  border-radius: 20px;
  border: 1px solid var(--maincolor);
  background-color: white;
}
.pagination button:hover {
  font-weight: bold;
  cursor: pointer;
  background-color: var(--maincolor);
}
.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.pagination .active {
  font-weight: bold;
}
</style>
