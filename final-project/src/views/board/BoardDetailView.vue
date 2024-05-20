<script setup>
// import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useBoardStore } from '@/stores/boardStore'
import { useRouter } from 'vue-router'
const router = useRouter()
// const clickPostMenu = ref(false)
// const toggleDropdown = () => (clickPostMenu.value = !clickPostMenu.value)
const { getUserNickname } = useUserStore()
const boardStore = useBoardStore()
const { boardState, commentState } = boardStore
import moment from 'moment'

const getPostNickname = async () => {
  boardState.nickname = await getUserNickname(boardState.board.userSeq)
}
const getCommentNicknameList = async () => {
  boardState.commentNnList.length = 0
  for (let i in boardState.board.comments) {
    boardState.commentNnList.push(await getUserNickname(boardState.board.comments[i].userSeq))
  }

  console.log(boardState.commentNnList)
}

getPostNickname()
getCommentNicknameList()
boardStore.listComment()
const comment = ref('')

const insertComment = () => {
  commentState.comment.commentContent = comment.value
  boardStore.writeComment()
  boardStore.listComment()
}
const deletePost = () => {
  boardStore.deletePost()
  router.push('/board')
}
const timeToString = (time) => {
  let data = moment(time).format('yyyy.M.DD HH:mm')
  return data
}
console.log(boardState.board)

const isSame = sessionStorage.getItem('userSeq') == boardState.board.userSeq
const isSameComment = []
for (let i in boardState.board.comments) {
  isSameComment.push(sessionStorage.getItem('userSeq') == boardState.board.comments[i].userSeq)
}
console.log(isSameComment)
console.log(sessionStorage.getItem('userSeq') == boardState.board.userSeq)
</script>

<template>
  <div class="boardContainer orbit">
    <div class="boardDetail">
      <div class="postHeader">
        <div>{{ boardState.board.postTitle }}</div>
        <div class="postMenuIcon" v-if="isSame">
          <RouterLink to="/boardUpdate">수정</RouterLink><button @click="deletePost">삭제</button>
        </div>
        <!-- <div class="postMenuIcon" @click="toggleDropdown">
          <img id="postBtn" src="@/assets/img/postmenu.png" />
        </div> -->
      </div>
      <hr />
      <div class="postInfo">
        {{ boardState.nickname }}
        | {{ timeToString(boardState.board.postTime) }}
        <span class="likeviewInfo"
          ><img src="@/assets/img/like.png" width="15px" />
          <span>{{ boardState.board.likeCount }}</span>
          <img src="@/assets/img/views.png" width="15px" />
          <span>{{ boardState.board.likeCount }}</span>
        </span>
      </div>
      <hr />
      <div class="postContent" v-html="boardState.board.postContent"></div>
      <div class="postComment">
        <div class="comment-write">
          <input class="orbit" type="text" v-model="comment" placeholder="댓글을 입력해주세요" />
          <button class="orbit" @click="insertComment(comment)">입력</button>
        </div>
        <div class="comment-list">
          <div v-for="(item, index) in boardState.board.comments" :key="index">
            <div class="comment-bottom">
              <img src="@/assets/img/userCircle.png" style="width: 20px; margin-right: 5pxs" /><span
                class="comment-nickname"
                >{{ boardState.commentNnList[index] }}</span
              >
              <span
                class="comment-delete"
                @click="boardStore.deleteComment(item.commentSeq)"
                v-if="isSameComment[index]"
                >삭제</span
              >
            </div>
            <div class="comment-content">{{ item.commentContent }}</div>
            <div class="comment-time">
              {{ timeToString(item.commentTime) }}
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
    <!-- <ul class="post-menu">
      <li>
        <RouterLink to="/boardWrite" class="orbit" @click="toggleDropdown">수정</RouterLink>
      </li>
      <li><RouterLink to="/board" class="orbit" @click="toggleDropdown">삭제</RouterLink></li>
    </ul> -->
  </div>
</template>
<style>
.boardContainer {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 80vh;
  align-items: center;
}
.boardDetail {
  width: 100%;
  max-width: 320px;
}
.postHeader {
  position: relative;
  display: flex;
}
.postMenuIcon {
  position: absolute;
  right: 0;
}
.postInfo {
  font-size: x-small;
  position: relative;
}
.likeviewInfo {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
}
.likeviewInfo span {
  font-size: small;
  padding: 0 10px 0 10px;
}
#postBtn {
  width: 20px;
}
.post-menu {
  list-style: none;
  display: flex;
  position: absolute;
  margin: 0;
  z-index: 100;

  flex-direction: column;
  align-items: center;
  width: 10%;
  background-color: white;
}

.post-menu li {
  list-style-type: none;
  padding-left: 0;
  margin-left: 0;
  font-size: small;
  width: 100%;
  max-width: 200px;
  padding: 1%;
}
.post-menu :hover {
  background: #dadada;
  border-radius: 4px;
}

.comment-write input {
  width: 100%;
  padding: 10px 0 10px 0;
  margin-top: 50px;
  border-radius: 10px;
  text-indent: 5%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-shadow: none;
  border: 1px solid rgb(192, 192, 192);
  font-size: small;
}
input:focus {
  outline: 1px solid #ffa967;
  border: none;
}
.comment-write button {
  float: right;
  width: 20%;
  padding: 5px;
  margin-top: 10px;
  font-size: small;
  border-radius: 10px;
  border-width: 0;
  background-color: #ffe6ca;
}

.comment-list {
  margin-top: 50px;
  height: 40vh;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.comment-list::-webkit-scrollbar {
  display: none;
}
.comment-bottom {
  font-size: small;
  display: flex;
  align-items: center;
}
.comment-nickname {
  font-size: small;
  font-weight: bold;
}
.comment-delete {
  margin-left: auto;
  font-size: x-small;
}
.comment-delete:hover {
  color: gray;
  cursor: pointer;
}
.comment-content {
  font-size: small;
}
.comment-time {
  font-size: x-small;
  color: gray;
}
blockquote {
  margin: 0;
}

blockquote p {
  padding: 15px;
  background: #eee;
  border-radius: 5px;
}
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
