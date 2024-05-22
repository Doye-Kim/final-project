<script setup>
import { ref, computed, watch } from 'vue'
import axios from '@/common/axios-config'
import KakaoMap from '@/components/KakaoMap.vue'
import { useAttractionStore } from '@/stores/attractionStore'
const { attractionState, getMarkers } = useAttractionStore()
const siDropdown = ref(false)
const gugunDropdown = ref(false)
const toggleSiDropdown = () => (siDropdown.value = !siDropdown.value)
const toggleGugunDropdown = () => (gugunDropdown.value = !gugunDropdown.value)

const regionList = ref([])
const sido = ref({
  code: 0,
  name: '지역'
})
const gugun = ref({
  code: 0,
  name: '구/군'
})
const sidoListUpdate = async () => {
  let { data } = await axios.get('/attraction/sido')
  for (let i in data) {
    regionList.value.push({ value: data[i].sidoCode, name: data[i].sidoName })
  }
}
sidoListUpdate()

const gugunList = ref([
  {
    value: 0,
    name: '지역을 먼저 선택해 주세요'
  }
])
const gugunListUpdate = async (sidoCode) => {
  gugunList.value.length = 0
  let { data } = await axios.get(`/attraction/gugun/${sidoCode}`)
  for (let i in data) {
    gugunList.value.push({ value: data[i].gugunCode, name: data[i].gugunName })
  }
}

const selectSido = (sidoCode, sidoName) => {
  sido.value.name = sidoName
  sido.value.code = sidoCode
  attractionState.sidoCode = sidoCode
  gugunListUpdate(sidoCode)
  toggleSiDropdown()
}

const selectGugun = (code, name) => {
  gugun.value.name = name
  gugun.value.code = code
  attractionState.gugunCode = code
  toggleGugunDropdown()
}
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

watch(selectList, (newList) => {
  attractionState.list = newList
  getMarkers()
})
console.log(selectList)
const allSelected = computed({
  get() {
    return checkList.length === selectList.value.length
  },
  set(e) {
    console.log('set', e)
    selectList.value = e ? [12, 32, 39, 14, 15, 25, 38] : []
  }
})
</script>

<template>
  <div class="container orbit">
    <div class="tourHeader">
      <div class="dropdowns">
        <div class="dropdown orbit">
          <button id="siBtn" @click="toggleSiDropdown" class="orbit dropdownBtn">
            {{ sido.name }}
          </button>
          <ul id="si" class="dropdown-menu" v-show="siDropdown">
            <li v-for="(item, index) in regionList" :key="index" class="dropdown-item">
              <div :value="item.value" @click="selectSido(item.value, item.name)">
                {{ item.name }}
              </div>
            </li>
          </ul>
        </div>
        <div class="dropdown">
          <button id="gugunBtn" class="dropdownBtn orbit" @click="toggleGugunDropdown">
            {{ gugun.name }}
          </button>
          <ul id="gugun" class="dropdown-menu" v-show="gugunDropdown">
            <li v-for="(item, index) in gugunList" :key="index" class="dropdown-item">
              <div :value="item.value" @click="selectGugun(item.value, item.name)">
                {{ item.name }}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <fieldset>
        <input type="checkbox" value="100" v-model="allSelected" />
        <label for="100">전체</label>
        <span v-for="(item, index) in checkList" :key="index">
          <input
            type="checkbox"
            :value="item.value"
            name="contents"
            v-model="selectList"
            @click="clickContent"
          />
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
  z-index: 200;
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
