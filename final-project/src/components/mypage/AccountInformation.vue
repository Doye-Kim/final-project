<script setup>
import EditInformation from './EditInformation.vue'
import ChangePassword from './ChangePassword.vue'
import { ref } from 'vue'
const navItem = ref(true)
const changeNavItem = (value) => {
  navItem.value = value
}
</script>
<template>
  <div>
    <nav class="accountNav orbit">
      <div class="nav-item" id="edit" :class="{ select: navItem }" @click="changeNavItem(true)">
        내 정보 수정
      </div>
      <div
        class="nav-item"
        id="changePW"
        :class="{ select: !navItem }"
        @click="changeNavItem(false)"
      >
        비밀번호 변경
      </div>
    </nav>

    <div class="myDetail">
      <EditInformation v-show="navItem" /> <ChangePassword v-show="!navItem" />
    </div>
  </div>
</template>
<style scoped>
.accountNav {
  display: flex;
  margin-bottom: 15px;
}
.nav-item {
  margin: 10px 10px 20px 10px;
}
.nav-item:hover {
  color: grey;
  cursor: pointer;
}
.select {
  color: #ffa967;
  font-weight: bold;
}
.myDetail {
  height: 60vh;
}
</style>
