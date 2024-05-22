import { reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/common/axios-config'

export const usePlanStore = defineStore('planStore', () => {
  const planState = reactive({
    list: []
  })
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
    let params = {
      planSeq: planSeq
    }
    let { data } = axios.delete('/plans', { params: params })
    console.log(data)
  }
  const getPlan = async () => {
    let { data } = await axios.get(`/plans/${userSeq}`)
    planState.list = data
    console.log(data)
  }
  return { planState, insertPlan, deletePlan, getPlan }
})
