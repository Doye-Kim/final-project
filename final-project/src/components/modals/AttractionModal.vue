<script setup>
import { ref, onMounted, watch, toRefs } from 'vue'

import { usePlanStore } from '@/stores/planStore'
import moment from 'moment'
import { useAuthStore } from '@/stores/authStore'
const { authStore } = useAuthStore()
import { useAttractionStore } from '@/stores/attractionStore'
const { attractionState } = useAttractionStore()
const { nowContentId } = toRefs(useAttractionStore())
import { useBookmarkStore } from '@/stores/bookmarkStore'
const { insertBookmark, isBookmark } = useBookmarkStore()
import { useModalStore } from '@/stores/modalStore'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const { getPlan, insertPlan, planState } = usePlanStore()
const date = ref(new Date())
const markers = ref([])
const load = async () => {
  markers.value = []
  try {
    await getPlan()
    planState.list.forEach((el) => {
      let flag = false
      markers.value.forEach((marker) => {
        if (marker.date === el.planDate) {
          flag = true
          marker.tooltip.push({
            text: el.title,
            color: 'orange'
          })
        }
      })
      if (!flag) {
        let now = {
          date: el.planDate,
          type: 'dot',
          tooltip: [{ text: el.title, color: 'orange' }],
          color: 'orange'
        }

        markers.value.push(now)
      }
      // console.log(now)
    })
  } catch (err) {
    console.log(err)
  }
}
const nowIsBookmark = ref(false)
onMounted(async () => {
  load()
  console.log(nowContentId.value)
  nowIsBookmark.value = await isBookmark(nowContentId.value)
})
watch(
  () => nowContentId.value,
  async (newCI) => {
    console.log('watch', nowContentId.value)
    if (newCI) {
      nowIsBookmark.value = await isBookmark(newCI)
    }
  },
  {
    immediate: true
  }
)

const modalStore = useModalStore()
console.log(attractionState.attraction.title)

const addPlan = (contentId, title) => {
  let newdate = moment(date.value, moment.ISO_8601).format('yyyy-MM-DD')
  console.log(newdate, contentId, title)
  insertPlan(newdate, contentId, title)
  modalStore.datepickerIsOpen = false
}
const addBookmark = (contentId) => {
  insertBookmark(contentId)
  nowIsBookmark.value = !nowIsBookmark.value
}

const clickPlanBtn = () => {
  console.log('click')
  modalStore.datepickerIsOpen = !modalStore.datepickerIsOpen
}
const handleDate = (modelData) => {
  date.value = modelData
  addPlan(attractionState.attraction.contentId, attractionState.attraction.title)
}
</script>
<template>
  <div class="attraction-modal-container orbit">
    <div>
      <div>
        <b>{{ attractionState.attraction.title }}</b>
      </div>
      <div class="addr">
        <span>{{ attractionState.attraction.addr1 }}</span>
      </div>
      <div class="icons" v-if="authStore.isLogin">
        <img class="plan-button" @click="clickPlanBtn" src="/src/assets/img/plan.png" />
        <img
          v-show="nowIsBookmark"
          class="bookmark-button"
          @click="addBookmark(attractionState.attraction.contentId)"
          src="/src/assets/img/bookmark_fill_main.png"
        />
        <img
          v-show="!nowIsBookmark"
          class="bookmark-button"
          @click="addBookmark(attractionState.attraction.contentId)"
          src="/src/assets/img/bookmark.png"
        />
      </div>
    </div>
    <VueDatePicker
      v-if="modalStore.datepickerIsOpen"
      class="date-picker"
      :model-value="date"
      @update:model-value="handleDate"
      :enable-time-picker="false"
      :markers="markers"
    ></VueDatePicker>
  </div>
</template>
<style scoped>
.attraction-modal-container {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 2px 2px 2px gray;
  width: 250px;
  height: 90px;
  padding: 10px;
  z-index: 200;
}
.plan-button {
  margin-right: 5px;
}
.icons {
  position: absolute;
  text-align: right;
  cursor: pointer;
  z-index: 250;
  bottom: 5px;
  right: 5px;
}
.date-picker {
  position: absolute;
  top: 66px;
  left: 5px;
  width: 200px;
}
</style>
