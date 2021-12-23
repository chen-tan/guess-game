<template>
  <div class="countdown">
    <span v-if="mode === 's'">倒计时：{{ surplus }} s</span>
    <div v-if="mode === 'clock'">
      倒计时：{{ clock.hour }} : {{ clock.minute }} : {{ clock.second }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 200
    },
    mode: {
      type: String,
      default: 's'   // 时分秒 clock     秒 s
    }
  },
  data() {
    return {
      timer: null,
      surplus: 0,
      clock: {},  
    }
  },
  watch: {
    total: {
      handler(val) {
        this.handleInit();
      },
      immediate: true
    },
    surplus(val) {
      if (this.mode === 'clock') {
        this.clock = this.parseTime(val);
      }
      if (val <= 0) {
        this.$emit('timeout');
      }
    }
  },
  methods: {
    handleStart() {
      this.handleInit();
      this.setTimer();
    },
    handlePause() {
      clearInterval(this.timer);
      this.timer = null;
    },
    handleContinue() {
      this.setTimer();
    },
    handleInit() {
      this.surplus = this.total;
      this.clock = this.parseTime(this.surplus);
    },
    setTimer() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (this.surplus > 0) {
          this.surplus--;
        } else {
          clearInterval(this.timer);
        }
      }, 1000)
    },
    parseTime(time) {
      const hour = Math.floor(time / 60 / 60).toString().padStart(2, 0);
      const minute =  Math.floor((time - hour * 60 * 60 ) / 60).toString().padStart(2, 0);
      const second =  Math.floor(time % 60).toString().padStart(2, 0);
      return { hour, minute, second }
    }
  }
}
</script>

<style>

</style>