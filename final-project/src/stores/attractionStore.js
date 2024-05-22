import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useMyStore } from '@/stores/myStore'
import axios from '@/common/axios-config'

export const useAttractionStore = defineStore('attractionStore', () => {
  const { myState } = useMyStore()
  const attractionState = reactive({
    list: [],
    attraction: {},
    sidoCode: 0,
    gugunCode: 0
  })
  const getAttraction = async (contentId) => {
    let { data } = await axios.get(`/attraction/place/${contentId}`)
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
  const getBookmarkMarkers = async () => {
    attractions.value = []
    myState.myBookmark.forEach((item) => {
      item.contentTypeId = 40
      attractions.value.push(item)
    })
    console.log(attractions)
  }

  const searchAttraction = async (title) => {
    attractions.value = []
    let attractionObj = {
      title: title
    }
    console.log(attractionObj)
    let { data } = await axios.get('/attraction/search', { params: attractionObj })
    data.forEach((item) => {
      item.contentTypeId = 41
      attractions.value.push(item)
    })
    console.log(attractions.value)
  }
  return {
    attractionState,
    searchAttraction,
    getMarkers,
    attractions,
    getAttraction,
    getBookmarkMarkers
  }
})
