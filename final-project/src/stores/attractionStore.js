import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/common/axios-config'

export const useAttractionStore = defineStore('attractionStore', () => {
  const attractionState = reactive({
    list: [],
    attraction: {},
    sidoCode: 0,
    gugunCode: 0
  })
  const getAttraction = async (contentId) => {
    let { data } = await axios.get(`/place/${contentId}`)
    return data
  }
  const attractions = ref([])
  const getMarkers = async () => {
    attractions.value = []
    for (let i in attractionState.list) {
      let attractionObj = {
        contentTypeId: attractionState.list[i],
        sidoCode: attractionState.sidoCode,
        gugunCode: attractionState.gugunCode
      }
      let { data } = await axios.get('/attraction/place', { params: attractionObj })
      data.forEach((item) => {
        item.contentTypeId = attractionObj.contentTypeId
        attractions.value.push(item)
      })
    }
    console.log(attractions)
  }
  return { attractionState, getMarkers, attractions, getAttraction }
})
