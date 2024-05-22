<template>
  <div class="plan-container orbit">
    <div class="vfor" v-for="(places, date) in groupedByDate" :key="date">
      <div>{{ date }}</div>
      <ul class="plan-list">
        <li v-for="(place, index) in places" :key="index" class="plan-list-li">
          <div class="title-area">{{ place.title }}</div>
          <div class="addr1-area">{{ place.addr1 }}</div>
          <img
            src="@/assets/img/close-btn.png"
            id="list-img"
            @click="vueDeletePlan(place.planSeq)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import { useMyStore } from '@/stores/myStore'
import { usePlanStore } from '@/stores/planStore'
const { deletePlan } = usePlanStore()
const { myState, getPlans } = useMyStore()
const vueDeletePlan = async (planSeq) => {
  try {
    await deletePlan(planSeq).then(() => {
      getPlans()
    })
  } catch (err) {
    console.log(err)
  }
}
const groupedByDate = ref({})
const nowList = ref([])

onMounted(async () => {
  try {
    await getPlans().then(() => {
      console.log('groupbymounted')
      nowList.value = myState.myPlan
      console.log('nowList', nowList.value, myState.myPlan)
      groupPlansByDate()
    })
  } catch (err) {
    console.log(err)
  }
})
watch(myState.myPlan, () => {
  // console.log('watch')
  groupPlansByDate()
})

const groupPlansByDate = () => {
  console.log(myState.myPlan, nowList.value)
  nowList.value = myState.myPlan
  // myState.myPlan = []
  groupedByDate.value = {}
  const sortedPlans = nowList.value.sort((a, b) => {
    return new Date(b.planDate) - new Date(a.planDate)
  })
  console.log(sortedPlans)
  groupedByDate.value = sortedPlans.reduce((acc, plan) => {
    if (!acc[plan.planDate]) {
      acc[plan.planDate] = []
    }
    acc[plan.planDate].push({
      title: plan.title,
      addr1: plan.addr1,
      planSeq: plan.planSeq
    })
    return acc
  }, {})
}
</script>
<style scoped>
.plan-container {
  height: 85vh;
  overflow-y: scroll;
}
.plan-list {
  list-style-type: none;
}
.plan-list-li {
  position: relative;
  border: 1px solid #dadada;
  border-radius: 20px;
  padding: 10px;
  margin: 5px;
}
#list-img {
  position: absolute;
  width: 20px;
  top: 20px;
  right: 10px;
  cursor: pointer;
}
.title-area {
  font-weight: bold;
  padding-right: 30px;
}
.addr1-area {
  font-size: small;
  padding-right: 30px;
}
</style>
