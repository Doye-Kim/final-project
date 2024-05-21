import { reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/common/axios-config'

export const useMyStore = defineStore('myStore', () => {
  const myState = reactive({
    myBookmark: [],
    myPlan: [],
    myPost: [],
    myCommentPost: [],
    myLikePost: []
  })
  const listState = reactive({
    list: []
  })

  const userSeq = sessionStorage.getItem('userSeq')
  const getBookmarks = async () => {
    let { data } = await axios.get(`/bookmarks/${userSeq}`)
    myState.myBookmark = data
    console.log(myState.myBookmark)
  }

  const getPlans = async () => {
    let { data } = await axios.get(`/plans/${userSeq}`)
    myState.myPlan = data
  }

  const getPost = async () => {
    let params = {
      userSeq: userSeq
    }
    let { data } = await axios.get(`/posts/post-list`, { params: params })
    myState.myPost = data
    console.log(myState.myPost)
  }

  const getCommentPost = async () => {
    let params = {
      userSeq: userSeq
    }
    let { data } = await axios.get(`/posts/commented-post-list`, { params: params })
    myState.myCommentPost = data
  }

  const getLikePost = async () => {
    let params = {
      userSeq: userSeq
    }
    let { data } = await axios.get(`/posts/liked-post-list`, { params: params })
    myState.myLikePost = data
  }

  return {
    listState,
    myState,
    getBookmarks,
    getPlans,
    getPost,
    getCommentPost,
    getLikePost
  }
})
