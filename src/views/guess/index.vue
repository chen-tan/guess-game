<template>
  <div class="guess-game-container">
    <BasicInfo />
    <Game />
  </div>
</template>

<script>
import mock from './mock'
import BasicInfo from './BasicInfo'
import Game from './Game'

export default {
  components: { BasicInfo, Game },
}
</script>

<style lang="scss" scoped>
  .guess-game-container {
    display: flex;
  }
</style>