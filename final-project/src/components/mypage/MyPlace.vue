<script setup>
import { onMounted } from 'vue'
import { useMyStore } from '@/stores/myStore'
const { getBookmarks, myState } = useMyStore()

onMounted(async () => {
  let seq = sessionStorage.getItem('userSeq')
  await getBookmarks(seq)
})
</script>
<template>
  <div>
    <div class="card-container">
      <div class="card" v-for="(item, index) in myState.myBookmark" :key="index">
        <img class="card-img" :src="item.firstImage" />
        <div class="card-content">
          <div class="title-icon">
            <div class="card-title">{{ item.title }}</div>
            <img class="bookmark-icon" src="@/assets/img/bookmark_fill_main.png" alt="bookmark" />
          </div>
          <div class="card-address">{{ item.addr1 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 두 개의 열을 가진 그리드로 설정 */
  grid-gap: 20px; /* 그리드 간격 설정 */
}

.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 15px;
  display: flex;
  flex-direction: column;
}

.title-icon {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
}

.card-address {
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
}

.bookmark-icon {
  color: var(--maincolor);
  font-size: 20px;
  width: 30px;
  vertical-align: middle;
}
</style>
