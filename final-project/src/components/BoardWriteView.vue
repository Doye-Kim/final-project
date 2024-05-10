<script setup></script>

<template>
  <div class="container orbit">
    <form class="write-form">
      <div class="inputArea">
        <input type="text" class="formInput orbit" placeholder="제목을 입력하세요" />
      </div>
      <hr />
      <div class="inputArea">
        <textArea class="textAreaInput orbit" rows="30" placeholder="내용을 입력하세요" />
      </div>
    </form>
  </div>
</template>
<style scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.write-form {
  width: 100%;
  max-width: 500px;
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
.textAreaInput {
  width: 100%;
  border-radius: 20px;
  text-indent: 5%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-shadow: none;
  border: 1px solid rgb(192, 192, 192);
  font-size: small;
}
</style>
