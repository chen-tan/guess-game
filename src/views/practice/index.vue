<template>
  <div>
    <!-- <DisplayGrid /> -->
    {{ $store.state.test.count }}
    {{ $store.getters.double }}
    <button @click="add">+1</button>
    <button @click="sub">-1</button>
    <button @click="multi">*4</button>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DisplayGrid from './DisplayGrid'

export default {
  components: { DisplayGrid },
  computed: {
    ...mapState({
      count: state => state.count
    })
  },
  methods: {
    add() {
      this.$store.commit('test/CHANGE', 'add')
    },
    sub() {
      this.$store.commit('test/CHANGE', 'sub')
    },
    multi() {
      this.$store.dispatch('test/asyncChange', 4)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>