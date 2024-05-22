<script setup>
import addDays from 'date-fns/addDays'

import { useModalStore } from '@/stores/modalStore'
const modalStore = useModalStore()
import { usePlanStore } from '@/stores/planStore'
import { ref } from 'vue'
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
load()
import moment from 'moment'
import { useAuthStore } from '@/stores/authStore'
const { authStore } = useAuthStore()
import { useAttractionStore } from '@/stores/attractionStore'
const { attractionState } = useAttractionStore()
import { useBookmarkStore } from '@/stores/bookmarkStore'
const { insertBookmark } = useBookmarkStore()

console.log(attractionState.attraction.title)

const addPlan = (contentId, title) => {
  let newdate = moment(date.value, moment.ISO_8601).format('yyyy-MM-DD')
  console.log(newdate, contentId, title)
  insertPlan(newdate, contentId, title)
}
const addBookmark = (contentId) => {
  insertBookmark(contentId)
}

const handleDate = (modelData) => {
  date.value = modelData
  addPlan(attractionState.attraction.contentId, attractionState.attraction.title)
}
</script>
<template>
  <div class="attraction-modal-container">
    <div>
      <div>
        <b>{{ attractionState.attraction.title }}</b>
      </div>
      <div class="addr">
        <span>{{ attractionState.attraction.addr1 }}</span>
      </div>
      <div class="icons" v-if="authStore.isLogin">
        <img
          class="plan-button"
          @click="
            addPlan(
              '2024-05-30',
              attractionState.attraction.contentId,
              attractionState.attraction.title
            )
          "
          src="/src/assets/img/plan.png"
        />
        <img
          class="bookmark-button"
          @click="addBookmark(attractionState.attraction.contentId)"
          src="/src/assets/img/bookmark_fill.png"
        />
      </div>
    </div>
    <VueDatePicker
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
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 2px 2px 2px gray;
  width: 250px;
  height: 100px;
  padding: 10px;
  z-index: 200;
}
.icons {
  text-align: right;
  cursor: pointer;
  z-index: 250;
}
</style>
