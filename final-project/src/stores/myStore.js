import { reactive, ref } from 'vue'
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
  const getBookmarks = async (seq) => {
    let { data } = await axios.get(`/bookmarks/${seq}`)
    myState.myBookmark = data
  }

  const planInfo = ref([])
  const getPlans = async () => {
    try {
      let { data } = await axios.get(`/plans/${userSeq}`)
      planInfo.value = data
      console.log(data)
      planInfo.value.forEach(async (item) => {
        let { data } = await axios.get(`/attraction/place/${item.contentId}`)
        console.log(data)
        let obj = {
          planSeq: item.planSeq,
          planDate: item.planDate,
          title: item.title,
          contentId: item.contentId,
          addr1: data.addr1,
          firstImage: data.firstImage
        }
        myState.myPlan.push(obj)
      })
      console.log(myState.myPlan)
    } catch (err) {
      console.log(err)
    }
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
