import { reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/common/axios-config'

export const usePlanStore = defineStore('planStore', () => {
  const planState = reactive({
    list: []
  })
  const userSeq = sessionStorage.getItem('userSeq')
  const insertPlan = async (planDate, contentId) => {
    let params = {
      userSeq: userSeq,
      contentId: contentId,
      planDate: '2024-05-20'
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
  const getPlan = async (year, month) => {
    let { data } = await axios.get(`/plans/${userSeq}/${year}/${month}`)
    planState.list = data
  }
  return { planState, insertPlan, deletePlan, getPlan }
})
