<template>
  <div id="container">
    <div id="map">
      <AttractionModal v-if="modalStore.AttractionIsOpen" />
      <img id="bookmarkBtn" @click="bookmarkBtnClick" src="@/assets/img/star_empty.png" />
      <img id="searchBtn" @click="searchBtnClick" src="@/assets/img/searchBtn.png" />
    </div>
  </div>
</template>

<script setup>
import AttractionModal from '@/components/modals/AttractionModal.vue'
import { ref, onMounted, watch, toRefs } from 'vue'
import { useAttractionStore } from '@/stores/attractionStore'
const { attractions } = toRefs(useAttractionStore())
const { attractionState } = useAttractionStore()
import { useModalStore } from '@/stores/modalStore'
const modalStore = useModalStore()

let markers = ref([])
// let onMarkerContents = ref([])

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    const map = initMap()
    console.log(map)

    watch(
      attractions,
      (newAtt, oldAtt) => {
        console.log('watch')
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
function displayMarker(attractions, map) {
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
      console.log('click', marker.getPosition())

      attractionState.attraction = item
      modalStore.AttractionIsOpen = !modalStore.AttractionIsOpen
      console.log(attractionState.attraction)
      map.setCenter(marker.getPosition())
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
  right: 5px;
  top: 5px;
  width: 30px;
}
#searchBtn {
  position: absolute;
  z-index: 199;
  left: 5px;
  top: 5px;
  width: 30px;
}
</style>
