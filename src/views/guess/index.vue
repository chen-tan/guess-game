<template>
  <div class="guess-game-container">
    <BasicInfo @basic-setting="setBasic" />
    <Game v-if="JSON.stringify(basicObj) !== '{}'" v-bind="basicObj" />
  </div>
</template>

<script>
import mock from './mock'
import BasicInfo from './BasicInfo'
import Game from './Game'

export default {
  components: { BasicInfo, Game },
  data() {
    return {
      basicObj: {}
    }
  },
  methods: {
    setBasic(basicObj) {
      this.basicObj = {...basicObj};
    }
  }
}
</script>

<style lang="scss" scoped>
  .guess-game-container {
    display: flex;
  }
</style>