<script setup>
import { ref } from 'vue'
import KakaoMap from './KakaoMap.vue'
const siDropdown = ref(false)
const gugunDropdown = ref(false)
const toggleSiDropdown = () => (siDropdown.value = !siDropdown.value)
const toggleGugunDropdown = () => (gugunDropdown.value = !gugunDropdown.value)
</script>

<template>
  <h1 id="indexText" class="orbit">지역별 관광 정보 조회</h1>
  <div class="container orbit">
    <div class="tourHeader">
      <div class="dropdowns">
        <div class="dropdown orbit">
          <button id="siBtn" @click="toggleSiDropdown" class="orbit dropdownBtn">지역</button>
          <ul id="si" class="dropdown-menu" v-show="siDropdown">
            <li><a class="dropdown-item" data-value="1" href="#">서울</a></li>
            <li><a class="dropdown-item" data-value="2" href="#">인천</a></li>
            <li><a class="dropdown-item" data-value="3" href="#">대전</a></li>
            <li><a class="dropdown-item" data-value="4" href="#">대구</a></li>
            <li><a class="dropdown-item" data-value="5" href="#">광주</a></li>
            <li><a class="dropdown-item" data-value="6" href="#">부산</a></li>
            <li><a class="dropdown-item" data-value="7" href="#">울산</a></li>
            <li>
              <a class="dropdown-item" data-value="8" href="#">세종특별자치시</a>
            </li>
            <li>
              <a class="dropdown-item" data-value="31" href="#">경기도</a>
            </li>
            <li>
              <a class="dropdown-item" data-value="32" href="#">강원특별자치도</a>
            </li>
            <li>
              <a class="dropdown-item" data-value="33" href="#">충청북도</a>
            </li>
            <li>
              <a class="dropdown-item" data-value="34" href="#">충청남도</a>
            </li>
            <li>
              <a class="dropdown-item" data-value="35" href="#">경상북도</a>
            </li>
            <li>
              <a class="dropdown-item" data-value="36" href="#">경상남도</a>
            </li>
            <li>
              <a class="dropdown-item" data-value="37" href="#">전북특별자치도</a>
            </li>
            <li>
              <a class="dropdown-item" data-value="38" href="#">전라남도</a>
            </li>
            <li>
              <a class="dropdown-item" data-value="39" href="#">제주도</a>
            </li>
          </ul>
        </div>
        <div class="dropdown">
          <button id="gugunBtn" class="dropdownBtn orbit" @click="toggleGugunDropdown">
            구/군
          </button>
          <ul id="gugun" class="dropdown-menu" v-show="gugunDropdown">
            <li>
              <a class="dropdown-item disabled" href="#">지역을 먼저 선택해 주세요</a>
            </li>
          </ul>
        </div>
      </div>
      <fieldset>
        <input type="checkbox" name="contents" value="100" />전체
        <input type="checkbox" name="contents" value="12" />관광지
        <input type="checkbox" name="contents" value="32" />숙박
        <input type="checkbox" name="contents" value="39" />음식점
        <input type="checkbox" name="contents" value="14" />문화시설
        <input type="checkbox" name="contents" value="15" />공연
        <input type="checkbox" name="contents" value="25" />여행코스
        <input type="checkbox" name="contents" value="38" />쇼핑
      </fieldset>
    </div>
  </div>
  <KakaoMap />
</template>

<style scoped>
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
</style>
