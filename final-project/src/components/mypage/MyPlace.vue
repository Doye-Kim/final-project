<template>
  <div>
    <title>이미지 카드</title>

    <div class="card-container">
      <div class="card">
        <img
          class="card-img"
          src="https://lh3.googleusercontent.com/proxy/SUr5CbjDR-Ndzs6RhUzOsMmGE27rnEGDQCHMnskEeoCJpQ2OI2KUjw5ybVd9F4pMqXVRvfIgysztNrbSkM_n6hk4TRHawBudGT4idaPGVEomvMXFpA"
          alt="Landscape"
        />
        <div class="card-content">
          <div class="title-icon">
            <div class="card-title">한라산</div>
            <img class="bookmark-icon" src="@/assets/img/bookmark.png" alt="bookmark" />
          </div>
          <div class="card-address">제주특별자치도 제주시 조천읍 한라산로 1942</div>
        </div>
      </div>

      <div class="card">
        <img
          class="card-img"
          src="https://previews.123rf.com/images/siempreverde22/siempreverde221712/siempreverde22171221450/91741411-%ED%94%BC%EB%A0%8C%EC%B2%B4-%ED%88%AC%EC%8A%A4%EC%B9%B4%EB%8B%88%EC%9D%98-%EC%9D%B4%ED%83%88%EB%A6%AC%EC%95%84-%EC%A7%80%EC%97%AD-%EB%B0%8F-%ED%94%BC%EB%A0%8C%EC%B2%B4-%EC%A7%80%EB%B0%A9%EC%9D%98-%EC%88%98%EB%8F%84-%EC%9D%B8.jpg"
          alt="Tuscany"
        />
        <div class="card-content">
          <div class="title-icon">
            <div class="card-title">투스카니</div>
            <img class="bookmark-icon" src="@/assets/img/bookmark.png" alt="bookmark" />
          </div>
          <div class="card-address">이탈리아 피렌체</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 두 개의 열을 가진 그리드로 설정 */
  grid-gap: 20px; /* 그리드 간격 설정 */
}

.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 15px;
  display: flex;
  flex-direction: column;
}

.title-icon {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
}

.card-address {
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
}

.bookmark-icon {
  color: #ff8800;
  font-size: 20px;
  vertical-align: middle;
}
</style>
