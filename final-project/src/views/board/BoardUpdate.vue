<script setup>
import { ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { MdEditor, NormalToolbar } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

import { useBoardStore } from '@/stores/boardStore'
const boardStore = useBoardStore()
const { boardState } = toRefs(useBoardStore())
const router = useRouter()
const toolbars = [
  'title',
  '-',
  'bold',
  'underline',
  'italic',
  'strikeThrough',
  'quote',
  'table',
  '-',
  0,
  '=',
  'save'
]

const content = ref(boardState.value.board.postContent)
const title = ref(boardState.value.board.postTitle)

const onSave = (v, h) => {
  console.log(v)
  if (title.value.length === 0) alert('제목을 입력해 주세요')
  else if (v.length === 0) alert('내용을 입력해 주세요')
  else {
    h.then((html) => {
      console.log(html)
      content.value = html

      boardState.value.board.postTitle = title.value
      boardState.value.board.postContent = content.value
      boardStore.updatePost()
      router.push('/board')
    })
  }
}
</script>

<template>
  <div class="container orbit">
    <form class="write-form">
      <div class="inputArea">
        <input
          type="text"
          class="formInput orbit"
          v-model="title"
          placeholder="제목을 입력하세요"
        />
      </div>
      <MdEditor
        :toolbars="toolbars"
        v-model="content"
        language="en-US"
        @onSave="onSave"
        style="border-radius: 20px"
      >
        <template #defToolbars>
          <NormalToolbar title="mark">
            <template #trigger>
              <svg class="md-editor-icon" aria-hidden="true">
                <use xlink:href="#icon-mark"></use>
              </svg>
            </template>
          </NormalToolbar>
        </template>
      </MdEditor>
    </form>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.write-form {
  width: 100%;
  max-width: 500px;
}
.formInput {
  width: 100%;
  aspect-ratio: 10/1;
  margin: 10px 0 10px 0;
  border-radius: 20px;
  text-indent: 5%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-shadow: none;
  border: 1px solid #dedede;
  font-size: small;
}
.textAreaInput {
  width: 100%;
  border-radius: 20px;
  text-indent: 5%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-shadow: none;
  border: 1px solid rgb(192, 192, 192);
  font-size: small;
}
input:focus {
  outline: 1px solid #ffa967;
  border: none;
}
.previewArea {
  margin-top: 20px;
}
.contentArea {
  height: 70vh;
}
</style>
