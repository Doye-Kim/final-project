import { reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/common/axios-config'
import { useModalStore } from '@/stores/modalStore'

export const useFriendStore = defineStore('friendStore', () => {
  const modalStore = useModalStore()
  const fromSeq = sessionStorage.getItem('userSeq')
  // 친구 닉네임, 친구 Seq
  const friendState = reactive({
    friendList: [],
    friend: {}
  })

  const getList = async () => {
    ///users/{userId}/follows
    let { data } = await axios.get(`/follows/${fromSeq}`)
    friendState.friendList = data
    console.log(data)
  }
  const duplicateFriend = (toSeq) => {
    console.log('?', toSeq)
    for (let i in friendState.friendList) {
      if (toSeq == friendState.friendList[i].toSeq) {
        console.log('!!!!!!!!!')
        return false
      }
    }
    return true
  }
  const addFriend = async () => {
    await getList()
    let params = {
      fromSeq: fromSeq,
      toSeq: friendState.friend.userSeq
    }
    if (!duplicateFriend(params.toSeq)) {
      alert('이미 추가된 친구입니다.')
      return
    }
    let { data } = await axios.post('/follows', null, { params: params })
    getList()
    if (data == 0) alert('등록 과정에 오류가 있어 등록에 실패했습니다.')
  }
  const deleteFriend = async (followSeq) => {
    let params = {
      followSeq: followSeq
    }
    let { data } = await axios.delete('/follows', { params: params })
    getList()
    if (data == 0) alert('삭제 과정에 오류가 있어 삭제에 실패했습니다.')
  }
  const searchFriendByNumber = async (number) => {
    ///users?user_phone={user_phone}
    let params = {
      user_phone: number
    }
    let { data } = await axios.get('/users', { params: params })
    friendState.friend = data
    console.log(data)
    console.log(friendState.friend.userSeq)
    modalStore.FriendInfoIsOpen = true
  }
  return { friendState, searchFriendByNumber, getList, addFriend, deleteFriend }
})
