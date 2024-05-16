import { reactive } from 'vue'
import axios from '@/common/axios-config'
import { defineStore } from 'pinia'

export const boardListContentStore = defineStore('boardContentStore', () => {
  //   const boardList = ref([]) // 게시글 리스트
  //   const board = ref({}) // 게시글 하나

  const boardState = reactive({
    boardList: [],
    board: {
      boardId: 0,
      name: '',
      title: '',
      content: '',
      postTime: '',
      updateTime: '',
      likeCount: 0,
      viewCount: 0,
      comments: []
    }
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
    boardState.boardList = boardListData
    // try {
    //   let response = await axios.get('/board')
    //   //console.log(response)
    //   // let data = await response.json()
    //   // console.log(data)

    //   let { data } = response
    //   boardState.boardList = data
    // } catch (error) {
    //   console.log(error)
    // }
  }
  const detailBoard = async (boardId) => {
    // 상세
    boardState.board = boardData
    // let url = '/board/' + boardId

    // try {
    //   let { data } = await axios.get(url)
    //   // let { data } = response;
    //   boardState.board = data
    // } catch (error) {
    //   console.log(error)
    // }
  }
  const writePost = async () => {
    try {
      //let response = await fetch('http://localhost:8080/students', fetchOptions);
      // let response = await axios({
      //   url: '/students',
      //   method: 'post',
      //   data: student.value
      // });
      let response = await axios.post('/boards', boardState.board)
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
    let url = '/boards/' + boardState.board.boardId

    try {
      let response = await axios.put(url, boardState.board.value)
      let { data } = response
      console.log(data)
      listBoard()
    } catch (error) {
      console.log(error)
    }
  }
  const deletePost = async () => {
    let url = '/boards/' + boardState.board.boardId

    try {
      let response = await axios.delete(url)
      let { data } = response
      console.log(data)
      listBoard()
    } catch (error) {
      console.log(error)
    }
  }

  const listComment = async (boardId) => {
    //boardState.boardList = boardListData
    try {
      let response = await axios.get(`/boards/${boardId}/comments`)
      //console.log(response)
      // let data = await response.json()
      // console.log(data)

      let { data } = response
      boardState.boardList = data
    } catch (error) {
      console.log(error)
    }
  }
  const writeComment = async () => {
    try {
      let response = await axios.post(`/boards', ${boardState.board.boardId}/comments`)
      let { data } = response
      console.log(data)
      listComment()
    } catch (error) {
      console.log(error)
    }
  }
  const deleteComment = async () => {
    let url = `/boards/${boardState.board.boardId}/${commentState.comment.commentSeq}`

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
  const boardListData = [
    {
      boardId: 1,
      title: '내이름은 김도예',
      content: '<h1>내가 곧 하늘이다.</h1><h2>hg2h2h2hh2h2h2</h2>',
      name: '김도예',
      postTime: new Date(),
      updateTime: new Date(),
      likeCount: 1,
      viewCount: 15,
      comments: [
        {
          commentContent: '네?',
          commentDate: new Date(),
          name: '김도예'
        }
      ]
    },
    {
      boardId: 2,
      title: '내이름은 칼도예',
      content: '<h1>내가 곧 검이다.</h1>',
      name: '검도예',
      postTime: new Date(),
      updateTime: new Date(),
      likeCount: 1,
      viewCount: 15,
      comments: [
        {
          commentContent: '네?',
          commentDate: new Date(),
          name: '김도예'
        }
      ]
    },
    {
      boardId: 3,
      title: '내이름은 궁도예',
      content: '<h1>내가 곧 활이다.</h1>',
      name: '궁도예',
      postTime: new Date(),
      updateTime: new Date(),
      likeCount: 1,
      viewCount: 15,
      comments: [
        {
          commentContent: '네?',
          commentDate: new Date(),
          name: '김도예'
        },
        {
          commentContent: '?',
          commentDate: new Date(),
          name: '이도예'
        }
      ]
    }
  ]

  const boardData = {
    boardId: 2,
    title: '내이름은 칼도예',
    content: '내가 곧 검이다.',
    name: '검도예',
    postTime: new Date(),
    updateTime: new Date(),
    likeCount: 1,
    viewCount: 15,
    comments: [
      {
        commentContent: '네?',
        commentDate: new Date(),
        name: '김도예'
      },
      {
        commentContent: '?',
        commentDate: new Date(),
        name: '이도예'
      }
    ]
  }

  return {
    boardState,
    boardListData,
    detailBoard,
    listBoard,
    writePost,
    updatePost,
    deletePost,
    listComment,
    writeComment,
    deleteComment
  }
})
