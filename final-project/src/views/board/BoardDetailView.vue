<script setup>
import { ref, onMounted, watch, toRefs } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useBoardStore } from '@/stores/boardStore'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import moment from 'moment'

const router = useRouter()
const userStore = useUserStore()
const boardStore = useBoardStore()
const { authStore } = useAuthStore()

const { boardState, commentState, viewPost, likePost, detailBoard, listComment, isLikePost } =
  boardStore

const { nowPostSeq } = toRefs(boardStore)

const userSeq = sessionStorage.getItem('userSeq')
const likeCount = ref(0)
const isLike = ref(false)
const comment = ref('')
const isSame = ref(false)

// 게시글 작성자 닉네임 가져오기
const getPostNickname = async () => {
  if (boardState.board && boardState.board.userSeq) {
    boardState.nickname = await userStore.getUserNickname(boardState.board.userSeq)
  }
}

// 댓글 작성자 닉네임 목록 가져오기
const getCommentNicknameList = async () => {
  boardState.commentNnList.length = 0
  if (boardState.board && boardState.board.comments) {
    for (const comment of boardState.board.comments) {
      boardState.commentNnList.push(await userStore.getUserNickname(comment.userSeq))
    }
  }
}

// 좋아요 클릭 핸들링
const clickLike = async () => {
  likeCount.value = await likePost(userSeq)
  isLike.value = !isLike.value
}

// 댓글 입력
const insertComment = async () => {
  if (comment.value.trim() === '') {
    alert('댓글을 입력해 주세요')
    return
  }
  commentState.comment.commentContent = comment.value
  comment.value = ''
  try {
    await boardStore.writeComment()
    await listComment()
    await getCommentNicknameList() // 새로 댓글 목록 가져오기
  } catch (err) {
    console.log(err)
  }
}

// 게시글 삭제
const deletePost = async () => {
  await boardStore.deletePost()
  router.push('/board')
}

// 시간 포맷팅
const timeToString = (time) => {
  return moment(time).format('YYYY.MM.DD HH:mm')
}

// 컴포넌트 초기화
onMounted(async () => {
  if (userSeq) {
    await viewPost(userSeq)
  }
  console.log(nowPostSeq.value)
  await detailBoard(boardState.board.postSeq)
  likeCount.value = boardState.board.likeCount
  isLike.value = await isLikePost(userSeq)
  await getPostNickname()
  await listComment()
  await getCommentNicknameList()
  isSame.value = sessionStorage.getItem('userSeq') == boardState.board.userSeq
})

watch(
  () => nowPostSeq.value,
  async (newPostSeq) => {
    console.log('watch', newPostSeq)
    if (newPostSeq) {
      isLike.value = await isLikePost(userSeq)
      console.log('watch isLike:', isLike.value)
    }
  },
  {
    immediate: true
  }
)

console.log(boardState.board)
</script>

<template>
  <div class="boardContainer orbit">
    <div class="boardDetail">
      <div class="postHeader">
        <div>{{ boardState.board.postTitle }}</div>
        <div class="postMenuIcon" v-if="isSame">
          <RouterLink to="/boardUpdate" class="postEdit">수정</RouterLink>
          <div @click="deletePost" class="orbit postEdit">삭제</div>
        </div>
      </div>
      <hr />
      <div class="postInfo">
        {{ boardState.nickname }} | {{ timeToString(boardState.board.postTime) }}
        <span class="likeviewInfo">
          <img
            v-if="!isLike"
            src="@/assets/img/like.png"
            width="20px"
            @click="clickLike"
            id="likeBtn"
          />
          <img
            v-if="isLike"
            src="@/assets/img/like_fill.png"
            width="20px"
            @click="clickLike"
            id="likeBtn"
          />
          <span>{{ likeCount }}</span>
          <img src="@/assets/img/views.png" width="15px" />
          <span>{{ boardState.board.viewCount }}</span>
        </span>
      </div>
      <hr />
      <div class="postContent" v-html="boardState.board.postContent"></div>

      <div class="postComment">
        <div class="comment-cnt">
          댓글 {{ boardState.board.comments ? boardState.board.comments.length : 0 }}
        </div>
        <div class="comment-write" v-if="authStore.isLogin">
          <input class="orbit" type="text" v-model="comment" placeholder="댓글을 입력해주세요" />
          <button class="orbit" @click="insertComment">입력</button>
        </div>
        <div class="comment-list">
          <div v-for="(item, index) in boardState.board.comments" :key="index">
            <div class="comment-bottom">
              <img src="@/assets/img/userCircle.png" style="width: 20px; margin-right: 5px" />
              <span class="comment-nickname">{{ boardState.commentNnList[index] }}</span>
              <span
                class="comment-delete"
                @click="boardStore.deleteComment(item.commentSeq)"
                v-if="boardState.isSameComment[index]"
                >삭제</span
              >
            </div>
            <div class="comment-content">{{ item.commentContent }}</div>
            <div class="comment-time">{{ timeToString(item.commentTime) }}</div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#likeBtn {
  cursor: pointer;
}
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
  height: 30px;
}
.postMenuIcon {
  position: absolute;
  display: flex;
  right: 0;
  top: 5px;
}
.postInfo {
  font-size: x-small;
  position: relative;
}
.postContent {
  font-size: small;
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

.comment-write input {
  width: 100%;
  padding: 10px 0 10px 0;
  margin-top: 10px;
  border-radius: 10px;
  text-indent: 5%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-shadow: none;
  border: 1px solid rgb(192, 192, 192);
  font-size: small;
}

.comment-write button {
  float: right;
  width: 20%;
  padding: 5px;
  margin-top: 10px;
  font-size: small;
  border-radius: 20px;
  border-width: 0;
  cursor: pointer;
  background-color: var(--maincolor);
}
.comment-write button:hover {
  background-color: white;
  box-shadow: 0 0 0 1.5px var(--maincolor) inset;
}
.comment-cnt {
  margin-top: 30px;
  font-size: small;
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
a {
  text-decoration: none;
  color: black;
}
.postEdit {
  font-size: x-small;
  border: 1px solid #dadada;
  border-radius: 15px;
  padding: 3px 5px 3px 5px;
  margin: 0 2px 0 2px;
  background-color: transparent;
}
.postEdit:hover {
  cursor: pointer;
  border: 1px solid #444444;
}
</style>
