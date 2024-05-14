<script setup>
import { ref, computed } from 'vue'
import KakaoMap from './KakaoMap.vue'
const siDropdown = ref(false)
const gugunDropdown = ref(false)
const toggleSiDropdown = () => (siDropdown.value = !siDropdown.value)
const toggleGugunDropdown = () => (gugunDropdown.value = !gugunDropdown.value)

const regionList = [
  { value: '1', name: '서울' },
  { value: '2', name: '인천' },
  { value: '3', name: '대전' },
  { value: '4', name: '대구' },
  { value: '5', name: '광주' },
  { value: '6', name: '부산' },
  { value: '7', name: '울산' },
  { value: '8', name: '세종특별자치시' },
  { value: '31', name: '경기도' },
  { value: '32', name: '강원특별자치도' },
  { value: '33', name: '충청북도' },
  { value: '34', name: '충청남도' },
  { value: '35', name: '경상북도' },
  { value: '36', name: '경상남도' },
  { value: '37', name: '전북특별자치도' },
  { value: '38', name: '전라남도' },
  { value: '39', name: '제주도' }
]

const checkList = [
  { value: 12, title: '관광지' },
  { value: 32, title: '숙박' },
  { value: 39, title: '음식점' },
  { value: 14, title: '문화시설' },
  { value: 15, title: '공연' },
  { value: 25, title: '여행코스' },
  { value: 38, title: '쇼핑' }
]
const selectList = ref([])
const allSelected = computed({
  get() {
    return checkList.length === selectList.value.length
  },
  set(e) {
    selectList.value = e ? [12, 32, 39, 14, 15, 25, 38] : []
  }
})
</script>

<template>
  <div class="container orbit">
    <div class="tourHeader">
      <div class="dropdowns">
        <div class="dropdown orbit">
          <button id="siBtn" @click="toggleSiDropdown" class="orbit dropdownBtn">지역</button>
          <ul id="si" class="dropdown-menu" v-show="siDropdown">
            <li v-for="(item, index) in regionList" :key="index" class="dropdown-item">
              <div :value="item.value">{{ item.name }}</div>
            </li>
          </ul>
        </div>
        <div class="dropdown">
          <button id="gugunBtn" class="dropdownBtn orbit" @click="toggleGugunDropdown">
            구/군
          </button>
          <ul id="gugun" class="dropdown-menu" v-show="gugunDropdown">
            <li class="dropdown-item disabled">
              <div>지역을 먼저 선택해 주세요</div>
            </li>
          </ul>
        </div>
      </div>
      <fieldset>
        <input type="checkbox" value="100" v-model="allSelected" />
        <label for="100">전체</label>
        <span v-for="(item, index) in checkList" :key="index">
          <input type="checkbox" :value="item.value" name="contents" v-model="selectList" />
          <label :for="item.value">{{ item.title }}</label>
        </span>
      </fieldset>
    </div>
  </div>
  <div id="bottomContainer">
    <!-- <div id="friendContainer">
      <input type="text" />
      <button>검색</button>
      <ul>
        <li>친구1</li>
        <li>친구2</li>
        <li>친구3</li>
      </ul>
    </div> -->
    <KakaoMap />
  </div>
</template>

<style scoped>
#bottomContainer {
  display: flex;
  justify-content: center;
}
#friendContainer {
  margin: 2%;
}
.dropdowns {
  display: flex;
  justify-content: center;
}
#indexText {
  text-align: center;
}
.container {
  position: relative;
  display: flex;
  justify-content: center;
}
.tourHeader {
  width: 100%;
}
fieldset {
  text-align: center;
  border-width: 0;
}
.dropdown {
  margin: 0 2% 0 2%;
}
.dropdownBtn {
  width: 200px;
  cursor: pointer;
}
.dropdown-menu {
  position: absolute;
  z-index: 100;
  width: 200px;
  padding: 0;
  background-color: white;
  margin: 2px 0 0 0;
  border: 1px solid #dadada;
  border-radius: 10px;
  box-shadow: 5px 5px 5px 1px gray;
}
.dropdown-item {
  list-style: none;
  text-align: center;
  padding: 4px;
}
.dropdown-item.disabled:hover {
  color: black;
  cursor: default;
}
.dropdown-item:hover {
  color: grey;
  cursor: pointer;
}
button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  background-color: #ffe6ca;
}
</style>
