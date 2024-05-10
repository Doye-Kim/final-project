<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div id="container">
    <RouterLink to="/boardWrite" class="writeBtnArea">
      <button>글쓰기</button>
    </RouterLink>
    <!-- todo: 글자수 넘어가면 말줄임표-->
    <div class="postList">
      <RouterLink to="/boardDetail" class="post orbit">
        <b class="title">제목</b>
        <p class="contents">내용입니다라마바사</p>
        <div class="info">익명 | 3분 전</div>
        <div class="info infobottom">
          <div><img class="infoIcon" src="@/assets/img/comment.png" /></div>
          <div>7</div>
          <div><img class="infoIcon" src="@/assets/img/like.png" /></div>
          <div>13</div>
          <div><img class="infoIcon" src="@/assets/img/views.png" /></div>
          <div>75</div>
        </div>
      </RouterLink>
      <div class="post orbit">
        <b class="title">제목</b>
        <p class="contents">아 하기시러아ㅓㅏㅣ어ㅏㅣㅓ아ㅣ너ㅏ</p>
        <div class="info">익명 | 3분 전</div>
        <div class="info infobottom">
          <div><img class="infoIcon" src="@/assets/img/comment.png" /></div>
          <div>7</div>
          <div><img class="infoIcon" src="@/assets/img/like.png" /></div>
          <div>13</div>
          <div><img class="infoIcon" src="@/assets/img/views.png" /></div>
          <div>75</div>
        </div>
      </div>
      <div class="post orbit">
        <b class="title">제목이 길다길길긱릭길길길길기길긱리</b>
        <p class="contents">내용입니다라마바사</p>
        <div class="info">익명 | 3분 전</div>
        <div class="info infobottom">
          <div><img class="infoIcon" src="@/assets/img/comment.png" /></div>
          <div>7</div>
          <div><img class="infoIcon" src="@/assets/img/like.png" /></div>
          <div>13</div>
          <div><img class="infoIcon" src="@/assets/img/views.png" /></div>
          <div>75</div>
        </div>
      </div>
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
}
.postList {
  display: flex;
  flex-direction: column;
  height: 80vh;
  align-items: center;
  width: 100%;
  max-width: 320px;
}
.post {
  width: 100%;
  height: 60px;
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
  top: 30px;
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
