import { reactive } from 'vue'
import axios from '@/common/axios-config'
import { defineStore } from 'pinia'

export const useBoardStore = defineStore(
  'boardStore',
  () => {
    //   const boardList = ref([]) // 게시글 리스트
    //   const board = ref({}) // 게시글 하나
    const boardState = reactive({
      boardList: [],
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
      commentNnList: []
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

    const listBoard = async () => {
      //boardState.boardList = boardListData
      try {
        let response = await axios.get('/posts')
        //console.log(response)
        // let data = await response.json()
        // console.log(data)

        let { data } = response
        boardState.boardList = data
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
    // 더미 데이터
    // const boardListData = [
    //   {
    //     postSeq: 1,
    //     postTitle: '내이름은 김도예',
    //     postContent: 'sfd',
    //     postTime: new Date(),
    //     updateTime: new Date(),
    //     likeCount: 1,
    //     userSeq: 1,
    //     viewCount: 15,
    //     comments: [
    //       {
    //         commentSeq: '1',
    //         commentContent: '네??????',
    //         commentTime: new Date(),
    //         postSeq: 1,
    //         userSeq: 1
    //       }
    //     ]
    //   },
    //   {
    //     postSeq: 2,
    //     postTitle: '내이름은 칼도예',
    //     postContent: '<h1>내가 곧 검이다.</h1>',
    //     postTime: new Date(),
    //     updateTime: new Date(),
    //     likeCount: 1,
    //     userSeq: 1,
    //     viewCount: 15,
    //     comments: [
    //       {
    //         commentSeq: '1',
    //         commentContent: '네?',
    //         commentTime: new Date(),
    //         postSeq: 2,
    //         userSeq: 1
    //       }
    //     ]
    //   },
    //   {
    //     postSeq: 3,
    //     postTitle: '내이름은 궁도예',
    //     postContent: '<h1>내가 곧 활이다.</h1>',
    //     postTime: new Date(),
    //     updateTime: new Date(),
    //     likeCount: 1,
    //     viewCount: 15,
    //     userSeq: 2,
    //     comments: [
    //       {
    //         commentSeq: '1',
    //         commentContent: '네?1',
    //         commentTime: new Date(),
    //         postSeq: 3,
    //         userSeq: 1
    //       },
    //       {
    //         commentSeq: '2',
    //         commentContent: '네?2',
    //         commentTime: new Date(),
    //         postSeq: 3,
    //         userSeq: 1
    //       },
    //       {
    //         commentSeq: '1',
    //         commentContent: '네?1',
    //         commentTime: new Date(),
    //         postSeq: 3,
    //         userSeq: 1
    //       },
    //       {
    //         commentSeq: '1',
    //         commentContent: '네?1',
    //         commentTime: new Date(),
    //         postSeq: 3,
    //         userSeq: 1
    //       },
    //       {
    //         commentSeq: '1',
    //         commentContent: '네?1',
    //         commentTime: new Date(),
    //         postSeq: 3,
    //         userSeq: 1
    //       },
    //       {
    //         commentSeq: '1',
    //         commentContent: '네?1',
    //         commentTime: new Date(),
    //         postSeq: 3,
    //         userSeq: 1
    //       },
    //       {
    //         commentSeq: '1',
    //         commentContent: '네?1',
    //         commentTime: new Date(),
    //         postSeq: 3,
    //         userSeq: 1
    //       },
    //       {
    //         commentSeq: '1',
    //         commentContent: '네?1',
    //         commentTime: new Date(),
    //         postSeq: 3,
    //         userSeq: 1
    //       },
    //       {
    //         commentSeq: '1',
    //         commentContent: '네?1',
    //         commentTime: new Date(),
    //         postSeq: 3,
    //         userSeq: 1
    //       }
    //     ]
    //   }
    // ]

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
      deleteComment
    }
  },
  {
    persist: true
  }
)
