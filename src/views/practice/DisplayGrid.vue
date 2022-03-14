<template>
  <div class="wrapper">
    <!-- <div style="background-color: aqua">
      one
    </div> -->
    <!-- <div style="background-color: #008c8c">two</div> -->
    <!-- <div style="background-color: salmon">
      three
    </div> -->
    <!-- <div style="background-color: sandybrown">four</div> -->
    <!-- <div style="background-color: seagreen">five</div> -->
    <!-- <div>six</div>
    <div>seven</div>
    <div>eight</div>
    <div>nine</div>
    <div>ten</div> -->
    <div class="media">
      <div class="img"></div>
      <div class="content"></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .media {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-areas: 'content img';
    min-width: 600px;
    min-height: 200px;
    border: 1px solid aqua;
    .img {
      grid-area: img;
      background-color:brown;
    }
    .content {
      grid-area: content;
      background-color:burlywood;
    }
  }
  // div:not(.wrapper) {
  //   border: 1px solid #000;
  // }
  // .wrapper {
  //   border: 1px dashed red;
  //   min-height: 20px;
  // }
  // .wrapper {
  //   display: grid;
  //   grid-template-columns: repeat(3, 1fr);
  //   grid-auto-rows: minmax(100px, auto);
  //   grid-gap: 20px 1em;
  //   :nth-of-type(1) {
  //     grid-column: 1;
  //     grid-row: span 3 / 4;
  //   }
  //   :nth-of-type(2) {
  //     grid-column: 3;
  //     grid-row: 1 / span 2;
  //   }
  //   :nth-of-type(3) {
  //     grid-column: 2;
  //     grid-row: 1;
  //   }
  //   :nth-of-type(4) {
  //     grid-row: 3;
  //     grid-column: 2 / span 3;
  //   }
  // }
</style>