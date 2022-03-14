<template>
  <div>
    <!-- <DisplayGrid /> -->
    <!-- {{ $store.state.test.a }} -->
    <router-view></router-view>
  </div>
</template>

<script>
import DisplayGrid from './DisplayGrid'

export default {
  components: { DisplayGrid }
}
</script>

<style lang="scss" scoped>

</style>