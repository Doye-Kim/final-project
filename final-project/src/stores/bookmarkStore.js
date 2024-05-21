import { reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/common/axios-config'
import { useAttractionStore } from '@/stores/attractionStore'

export const useBookmarkStore = defineStore('bookmarkStore', () => {
  const { attractionState } = useAttractionStore()
  const bookmarkState = reactive({
    list: []
  })
  const userSeq = sessionStorage.getItem('userSeq')
  const insertBookmark = async () => {
    let params = {
      userSeq: userSeq,
      title: attractionState.attraction.title,
      addr1: attractionState.attraction.addr1,
      firstImage: attractionState.attraction.firstImage
    }
    let { data } = axios.post('/bookmarks', null, { params: params })
    console.log(data)
  }
  const deleteBookmark = async (bookmarkSeq) => {
    let params = {
      bookmarkSeq: bookmarkSeq
    }
    let { data } = axios.delete('/bookmarks', { params: params })
    console.log(data)
  }
  const getBookmark = async () => {
    let { data } = await axios.get(`/bookmarks/${userSeq}`)
    bookmarkState.list = data
  }
  return { bookmarkState, insertBookmark, deleteBookmark, getBookmark }
})
