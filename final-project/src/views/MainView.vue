<script setup></script>

<template>
  <div class="windowContainer">
    <div class="windowdiv"><img class="window-left" src="@/assets/img/new2.jpg" /></div>
    <div class="windowdiv"><img class="window-center" src="@/assets/img/new7.jpg" /></div>
    <div class="windowdiv"><img class="window-right" src="@/assets/img/new3.jpg" /></div>
  </div>
  <!-- <div class="ticket">
    <div class="ticketContainer">
      <div class="ticketTop">
        <p>community</p>
      </div>
      <div>닉네임</div>
    </div>
    <div class="ticketContainer">
      <div class="ticketTop">
        <p>community</p>
      </div>
    </div>
  </div> -->
</template>

<style scoped>
.windowContainer {
  margin: 100px 0 100px 0;
  display: flex;
  justify-content: center;
}
.window-left {
  border-radius: 180px 100px 100px 100px;
  width: 100%;
}
.window-center {
  border-radius: 100px;
  width: 100%;
}
.window-right {
  border-radius: 100px 180px 100px 100px;
  width: 100%;
}
.windowdiv {
  width: 25vw;
  margin: 10px;
}
</style>
