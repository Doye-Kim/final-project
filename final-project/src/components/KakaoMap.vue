<template>
  <div id="container">
    <div id="map">
      <AttractionModal v-if="modalStore.AttractionIsOpen" />
      <img id="bookmarkBtn" @click="bookmarkBtnClick" src="@/assets/img/star_empty.png" />
      <img id="searchBtn" @click="searchBtnClick" src="@/assets/img/searchBtn.png" />
      <div v-if="modalStore.SearchInputIsOpen" class="inputDiv">
        <input
          type="text"
          id="searchInput"
          class="orbit"
          @keyup.enter="submit"
          v-model="searchWord"
        /><img class="closeBtnImg" src="@/assets/img/close-btn.png" @click="closeSearchBtn" />
      </div>
      <FriendBookmarkModal v-if="modalStore.FriendBookmarkIsOpen" />
    </div>
  </div>
</template>

<script setup>
import FriendBookmarkModal from '@/components/modals/FriendBookmarkModal.vue'
import AttractionModal from '@/components/modals/AttractionModal.vue'
import { ref, onMounted, watch, toRefs } from 'vue'
import { useAttractionStore } from '@/stores/attractionStore'
const { attractions } = toRefs(useAttractionStore())
const { attractionState, searchAttraction } = useAttractionStore()
import { useModalStore } from '@/stores/modalStore'
const modalStore = useModalStore()

let markers = ref([])
// let onMarkerContents = ref([])
const searchWord = ref('')
const submit = () => {
  modalStore.AttractionIsOpen = false
  console.log(searchWord.value)
  searchAttraction(searchWord.value)
}
onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    const map = initMap()
    console.log(map)

    watch(
      attractions,
      (newAtt) => {
        console.log('watch', newAtt)
        // if (attractionState.list.length > 0 && newAtt.length == 0)
        //   alert(' ̗̀(ꙨꙨ)ː̖́\n해당 지역엔 선택하신 컨텐츠의 관광지가 없습니다')
        deleteAll()
        if (newAtt.length > 0) displayMarker(newAtt, map)
      },
      {
        deep: true
      }
    )
  } else {
    const script = document.createElement('script')
    /* global kakao */
    script.onload = () => kakao.maps.load(this.initMap)
    script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?appkey=f37972f5b5b4ffa94728b675176943ac'
    document.head.appendChild(script)
  }
})

const bookmarkBtnClick = () => {
  modalStore.FriendBookmarkIsOpen = !modalStore.FriendBookmarkIsOpen
}

const searchBtnClick = () => {
  modalStore.SearchInputIsOpen = true
}
const closeSearchBtn = () => {
  console.log('close')
  modalStore.SearchInputIsOpen = false
}

const initMap = () => {
  var container = document.getElementById('map')
  var options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3
  }
  return new kakao.maps.Map(container, options)
}

const deleteAll = () => {
  console.log('delete', markers)
  markers.value.forEach((marker) => {
    console.log('markers')
    marker.setMap(null)
  })
  markers.value = []
  console.log(markers)
}

let now = null
function displayMarker(attractions, map) {
  console.log('display', attractions)
  const imgSize = new kakao.maps.Size(25, 25)
  let newLatLng = new kakao.maps.LatLng(attractions[0].mapy, attractions[0].mapx)

  attractions.forEach((item) => {
    const imgSrc = `/src/assets/img/newmarker${item.contentTypeId}.png`
    const markerImg = new kakao.maps.MarkerImage(imgSrc, imgSize)
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(item.mapy, item.mapx),
      title: item.title,
      image: markerImg
    })

    kakao.maps.event.addListener(marker, 'click', function () {
      if (now == null) {
        modalStore.AttractionIsOpen = true
      } else if (attractionState.attraction !== item) {
        map.setCenter(marker.getPosition())
      } else modalStore.AttractionIsOpen = !modalStore.AttractionIsOpen
      attractionState.attraction = item
      now = item
    })

    marker.setMap(map)
    markers.value.push(marker)
  })

  map.setCenter(newLatLng)
}
</script>

<style scoped>
#container {
  width: 85%;
  height: 70vh;
}
#map {
  width: 100%;
  height: 100%;
}
#bookmarkBtn {
  position: absolute;
  z-index: 199;
  cursor: pointer;
  right: 5px;
  top: 5px;
  width: 30px;
}
#searchBtn {
  position: absolute;
  z-index: 199;
  left: 5px;
  cursor: pointer;
  top: 5px;
  width: 30px;
}
#searchInput {
  position: absolute;
  z-index: 200;
  left: 5px;
  cursor: pointer;
  top: 5px;
  width: 150px;
  border: 1px solid #dadada;
  border-radius: 20px;
  background-image: url('../assets/img/Search_alt.png');
  background-repeat: no-repeat;
  background-position: 5px center;
  padding-left: 35px;
  height: 25px;
}
.inputDiv {
  position: relative;
  width: 190px;
  height: 25px;
}
.closeBtnImg {
  position: absolute;
  z-index: 250;
  width: 20px;
  top: 10px;
  right: 5px;
  cursor: pointer;
}
</style>
