<script setup>
import { useModalStore } from '@/stores/modalStore'
const modalStore = useModalStore()
import { useAuthStore } from '@/stores/authStore'
const { authStore } = useAuthStore()
import { useAttractionStore } from '@/stores/attractionStore'
const { attractionState } = useAttractionStore()
import { usePlanStore } from '@/stores/planStore'
const { insertPlan } = usePlanStore()
import { useBookmarkStore } from '@/stores/bookmarkStore'
const { insertBookmark } = useBookmarkStore()

console.log(attractionState.attraction.title)

const addPlan = (planDate, contentId) => {
  insertPlan(planDate, contentId)
}
const addBookmark = () => {
  insertBookmark()
}
</script>
<template>
  <div class="attraction-modal-container">
    <div>
      <b>{{ attractionState.attraction.title }}</b>
    </div>
    <div class="addr">
      <span>{{ attractionState.attraction.addr1 }}</span>
    </div>
    <div class="icons" v-if="authStore.isLogin">
      <img
        class="plan-button"
        @click="addPlan('2024-05-30', attractionState.attraction.contentId)"
        src="/src/assets/img/plan.png"
      />
      <img class="bookmark-button" @click="addBookmark" src="/src/assets/img/bookmark_fill.png" />
    </div>
  </div>
</template>
<style scoped>
.attraction-modal-container {
  position: absolute;
  top: 20%;
  left: 36.5%;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 2px 2px 2px gray;
  width: 250px;
  height: 100px;
  padding: 10px;
  z-index: 200;
}
.addr {
  text-align: center;
}
.icons {
  text-align: right;
  cursor: pointer;
  z-index: 250;
}
</style>
