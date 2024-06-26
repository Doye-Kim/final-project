import { reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/common/axios-config'
import { useMyStore } from '@/stores/myStore'

export const useBookmarkStore = defineStore('bookmarkStore', () => {
  const { myState } = useMyStore()
  const bookmarkState = reactive({
    list: []
  })
  const userSeq = sessionStorage.getItem('userSeq')
  const insertBookmark = async (contentId) => {
    console.log(contentId)
    try {
      let params = {
        userSeq: userSeq,
        contentId: contentId
      }
      let { data } = await axios.post('/bookmarks', params)
      console.log(data)
    } catch (error) {
      console.error('Failed to fetch and process attraction data:', error)
    }
  }
  const deleteBookmark = async (bookmarkSeq) => {
    let params = {
      bookmarkSeq: bookmarkSeq
    }
    let { data } = axios.delete('/bookmarks', { params: params })
    console.log(data)
  }
  const getBookmarks = async (seq) => {
    let { data } = await axios.get(`/bookmarks/${seq}`)
    myState.myBookmark = data
  }

  const isBookmark = async (contentId) => {
    let { data } = await axios.get(`/bookmarks/${userSeq}/${contentId}`)
    return data
  }
  return { bookmarkState, isBookmark, insertBookmark, deleteBookmark, getBookmarks }
})
