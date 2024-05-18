<template>
  <div class="container orbit">
    <input type="password" placeholder="현재 비밀번호" class="orbit" />
    <input type="password" placeholder="새 비밀번호" class="orbit" />
    <input type="password" placeholder="비밀번호 확인" class="orbit" />
    <div id="saveBtn">변경하기</div>
  </div>
</template>

<style scoped>
input {
  width: 50%;
  height: 45px;
  border-radius: 20px;
  text-indent: 5%;
  border: 1px solid #dadada;
  font-size: small;
  margin-bottom: 3%;
}
input:focus {
  outline: 1px solid #ffa967;
  border: none;
}
#saveBtn {
  text-align: center;
  width: 50%;
  height: auto;
  border-radius: 20px;
  background-color: #ffe6ca;
  padding: 2% 0 2% 0;
}
#saveBtn:hover {
  cursor: pointer;
}
</style>
