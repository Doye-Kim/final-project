<template>
  <div id="container">
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap()
    } else {
      const script = document.createElement('script')
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap)
      script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?appkey=f37972f5b5b4ffa94728b675176943ac'
      document.head.appendChild(script)
    }
  },
  methods: {
    initMap() {
      var container = document.getElementById('map')
      var options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
      }

      // eslint-disable-next-line no-unused-vars
      const map = new kakao.maps.Map(container, options)
      console.log(map)
    }
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
