import { reactive } from 'vue'
import axios from '@/common/axios-config'
import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/userStore'

export const useBoardStore = defineStore(
  'boardStore',
  () => {
    //   const boardList = ref([]) // 게시글 리스트
    //   const board = ref({}) // 게시글 하나
    const { getUserNickname } = useUserStore()
    const boardState = reactive({
      boardList: [],
      nicknameList: [],
      board: {
        postSeq: 0,
        postTitle: '',
        postContent: '',
        postTime: '',
        updateTime: '',
        likeCount: 0,
        viewCount: 0,
        userSeq: 0,
        comments: []
      },
      nickname: '',
      commentNnList: [],
      isSameComment: []
    })

    const commentState = reactive({
      commentList: [],
      comment: {
        commentSeq: 0,
        commentContent: '',
        commentDate: '',
        postId: 0,
        userSeq: 0
      }
    })

    const viewPost = async (userSeq) => {
      // /posts/{postSeq}/view
      let viewObj = {
        userSeq: userSeq
      }
      let { data } = await axios.post(`/posts/${boardState.board.postSeq}/view`, viewObj)
      console.log(data)
    }

    const likePost = async (userSeq) => {
      let likeObj = {
        userSeq: userSeq
      }
      let { data } = await axios.post(`/posts/${boardState.board.postSeq}/like`, likeObj)
      return data
    }
    const listBoard = async () => {
      //boardState.boardList = boardListData
      try {
        let response = await axios.get('/posts')
        //console.log(response)
        // let data = await response.json()
        // console.log(data)

        let { data } = response
        boardState.boardList = data
        data.forEach(async (el) => {
          let nickname = await getUserNickname(el.userSeq)
          boardState.nicknameList.push(nickname)
        })
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    const detailBoard = async (postSeq) => {
      // 상세
      console.log(postSeq)
      let url = '/posts/' + postSeq

      try {
        let { data } = await axios.get(url)
        // let { data } = response;
        boardState.board = data
      } catch (error) {
        console.log(error)
      }
    }
    const writePost = async () => {
      try {
        const postObj = {
          title: boardState.board.postTitle,
          content: boardState.board.postContent,
          userSeq: sessionStorage.getItem('userSeq')
        }
        console.log('writePost', postObj)
        let response = await axios.post('/posts', null, { params: postObj })
        let { data } = response
        console.log(data)
        listBoard()
      } catch (error) {
        console.log(error)
      }
    }

    const updatePost = async () => {
      // fetch + rest api
      // /students PUT
      let url = '/posts/' + boardState.board.postSeq
      const postObj = {
        title: boardState.board.postTitle,
        content: boardState.board.postContent
      }
      try {
        let response = await axios.put(url, null, { params: postObj })
        let { data } = response
        console.log(data)
        listBoard()
      } catch (error) {
        console.log(error)
      }
    }
    const deletePost = async () => {
      let url = '/posts/' + boardState.board.postSeq

      try {
        let response = await axios.delete(url)
        let { data } = response
        console.log(data)
        listBoard()
      } catch (error) {
        console.log(error)
      }
    }
    const listComment = async () => {
      //boardState.boardList = boardListData
      try {
        let { data } = await axios.get(`/posts/${boardState.board.postSeq}/comments`)
        boardState.board.comments = data
        console.log(data)
        boardState.commentNnList.length = 0
        for (let i in boardState.board.comments) {
          boardState.commentNnList.push(await getUserNickname(boardState.board.comments[i].userSeq))
          boardState.isSameComment.push(
            sessionStorage.getItem('userSeq') == boardState.board.comments[i].userSeq
          )
        }
      } catch (error) {
        console.log(error)
      }
    }
    const writeComment = async () => {
      const commentObj = {
        userSeq: sessionStorage.getItem('userSeq'),
        commentContent: commentState.comment.commentContent
      }
      console.log(commentObj)
      try {
        let { data } = await axios.post(`/posts/${boardState.board.postSeq}/comments`, null, {
          params: commentObj
        })
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    const deleteComment = async (commentSeq) => {
      let url = `/posts/comments/${commentSeq}`

      try {
        let response = await axios.delete(url)
        let { data } = response
        console.log(data)
        listComment()
      } catch (error) {
        console.log(error)
      }
    }

    return {
      boardState,
      commentState,
      detailBoard,
      listBoard,
      writePost,
      updatePost,
      deletePost,
      listComment,
      writeComment,
      deleteComment,
      viewPost,
      likePost
    }
  },
  {
    persist: true
  }
)
