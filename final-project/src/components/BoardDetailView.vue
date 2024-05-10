<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
const clickPostMenu = ref(false)
const toggleDropdown = () => (clickPostMenu.value = !clickPostMenu.value)
</script>

<template>
  <div class="container orbit">
    <div class="detail">
      <div class="postHeader">
        <div>제목</div>
        <div class="postMenuIcon"><button>수정</button><button>삭제</button></div>
        <!-- <div class="postMenuIcon" @click="toggleDropdown">
          <img id="postBtn" src="@/assets/img/postmenu.png" />
        </div> -->
      </div>
      <hr />
      <div class="postInfo">익명 | 2024년 5월 10일 금요일 오전 3시 36분</div>
      <hr />
      <div>내용</div>
    </div>
    <ul class="post-menu" v-show="clickPostMenu">
      <li>
        <RouterLink to="/modify" class="orbit" @click="toggleDropdown">수정</RouterLink>
      </li>
      <li><RouterLink to="/delete" class="orbit" @click="toggleDropdown">삭제</RouterLink></li>
    </ul>
  </div>
</template>
<style scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 80vh;
  align-items: center;
}
.detail {
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
a {
  text-decoration: none;
  color: black;
}
</style>
