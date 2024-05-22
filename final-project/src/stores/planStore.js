import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/common/axios-config'
import { useMyStore } from '@/stores/myStore'

export const usePlanStore = defineStore('planStore', () => {
  const { getPlans, myState } = useMyStore()
  const planState = reactive({
    list: []
  })
  const plans = ref([])
  // todo planDate
  const userSeq = sessionStorage.getItem('userSeq')
  const insertPlan = async (planDate, contentId, title) => {
    let params = {
      userSeq: userSeq,
      contentId: contentId,
      planDate: planDate,
      title: title
    }
    let { data } = axios.post('/plans', params)
    console.log(data)
  }
  const deletePlan = async (planSeq) => {
    console.log('delete')
    let { data } = await axios.delete(`/plans/${planSeq}`)
    console.log(data)
  }
  const getPlan = async () => {
    let { data } = await axios.get(`/plans/${userSeq}`)
    planState.list = data
    console.log(data)
  }
  return { plans, planState, insertPlan, deletePlan, getPlan }
})
