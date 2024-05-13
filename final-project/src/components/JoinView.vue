import { RouterLink } from 'vue-router';
<template>
  <!-- todo: validate-->
  <div class="container orbit">
    <div class="join-content">
      <div class="join-header">
        <h1>회원가입</h1>
      </div>
      <form class="join-body">
        <div class="inputArea">
          <input type="text" class="formInput orbit" placeholder="이름" />
        </div>
        <div class="inputArea">
          <input type="text" class="formInput orbit" placeholder="아이디" />
        </div>
        <div class="inputArea">
          <input type="password" class="formInput orbit" placeholder="비밀번호" />
        </div>
        <div class="inputArea">
          <input type="password" class="formInput orbit" placeholder="비밀번호 확인" />
        </div>
        <div class="inputArea">
          <input type="email" class="formInput orbit" placeholder="이메일" />
        </div>
        <div class="inputArea">
          <RouterLink to="/" class="joinBtn orbit">회원 가입</RouterLink>
        </div>
        <div class="text-end inputArea">
          <p>
            해당 계정은 trip에서 제공하는 서비스를 모두 이용하실 수 있습니다. 가입 시, 서비스
            이용약관, 개인정보처리 방침에 동의하는 것으로 간주합니다.
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.join-header {
  text-align: center;
}
.join-content {
  width: 100%;
  max-width: 320px;
  border-radius: 20px;
}

.postList {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.inputArea {
  width: 80%;
  margin: 0 auto;
}

.formInput {
  width: 100%;
  aspect-ratio: 10/1;
  margin-top: 10px;
  border-radius: 20px;
  text-indent: 5%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-shadow: none;
  border: 1px solid rgb(192, 192, 192);
  font-size: small;
}
.joinBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 10/1;
  margin-top: 10px;
  font-size: small;
  border-radius: 20px;
  border-width: 0;
  background-color: #ffe6ca;
}

.text-end {
  margin-top: 1%;
  text-align: center;
  font-size: x-small;
  margin-bottom: 30%;
}
a {
  color: grey;
}
</style>
