<template>
  <div id="container">
    <div id="map"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, toRefs } from 'vue'
import { useAttractionStore } from '@/stores/attractionStore'
const { attractions } = toRefs(useAttractionStore())
const { attractionState } = useAttractionStore()
let markers = ref([])
// let onMarkerContents = ref([])
let selectMarker = ''
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
const displayMarker = (attractions, map) => {
  console.log('displayMarker')
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
    console.log(marker.position)
    marker.setMap(map)
    const content = `<div
    							      style="
    							        background-color: rgba(255, 255, 255, 0.9);
    							        border-radius: 10px;
    							        box-shadow: 2px 2px 2px gray;
    							        width: 100%;
    							        padding: 10px;
                          z-index: 100;
    							      "
    							    >
    							      <div><b style="color: rgb(99, 141, 182);">${item.title}</b></div>
    							      <div style="text-align: center;"><span>${item.addr1}</span></div>
    							      <div style="text-align: right"><img src="/src/assets/img/plan.png"><img style="margin: 0 5px 0 5px;" src="/src/assets/img/bookmark_fill.png"></div>
                      </div>`
    const customOverlay = new kakao.maps.CustomOverlay({
      content: content,
      position: marker.getPosition(),
      yAnchor: 1.5
    })
    kakao.maps.event.addListener(marker, 'click', markerClickToggle(map, customOverlay))
    markers.value.push(marker)
  })
  // console.log(marker.position)
  map.setCenter(newLatLng)
}
function markerClickToggle(map, customOverlay) {
  return function () {
    console.log(selectMarker)
    if (selectMarker.length !== 0) {
      selectMarker.setMap(null)
    }
    if (selectMarker == customOverlay) {
      selectMarker.setMap(null)
      selectMarker = ''
      return
    }
    selectMarker = customOverlay
    customOverlay.setMap(map)
  }
}
</script>

<style scoped>
#container {
  width: 70%;
  height: 70vh;
}
#map {
  width: 100%;
  height: 100%;
}
</style>
