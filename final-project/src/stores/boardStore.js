import { ref, computed, reactive } from 'vue'
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
      time: ''
    }
  })

  function listBoard() {
    boardState.boardList = boardListData
  }

  // function getBoard(boardId) {
  //   boardState.board = boardState.boardList.find((board) => board.boardId === boardId)
  // }

  // 더미 데이터
  const boardListData = [
    {
      boardId: 1,
      title: '내이름은 김도예',
      content: '내가 곧 하늘이다.',
      name: '김도예',
      time: Date()
    },
    {
      boardId: 2,
      title: '내이름은 칼도예',
      content: '내가 곧 검이다.',
      name: '검도예',
      time: Date()
    },
    {
      boardId: 3,
      title: '내이름은 궁도예',
      content: '내가 곧 활이다.',
      name: '궁도예',
      time: Date()
    }
  ]

  const boardData = {
    boardId: 2,
    title: '내이름은 칼도예',
    content: '내가 곧 검이다.',
    name: '검도예',
    time: Date()
  }
  return {
    boardState,
    boardListData,
    boardData,
    listBoard
  }
})
