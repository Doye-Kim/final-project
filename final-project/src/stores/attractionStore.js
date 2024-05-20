import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/common/axios-config'

export const useAttractionStore = defineStore('attractionStore', () => {
  const attractionState = reactive({
    list: [],
    sidoCode: 0,
    gugunCode: 0
  })
  const markers = ref([])
  const getMarkers = async () => {
    for (let i in attractionState.list) {
      console.log(attractionState.list[i])
      let attractionObj = {
        contentTypeId: attractionState.list[i],
        sidoCode: attractionState.sidoCode,
        gugunCode: attractionState.gugunCode
      }
      console.log(attractionObj)
      let { data } = await axios.get('/attraction/place', { params: attractionObj })
      console.log(data)
      data.forEach((item) => {
        markers.value.push(item)
      })
    }
    console.log(markers)
  }
  return { attractionState, getMarkers }
})
