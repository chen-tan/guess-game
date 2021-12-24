<template>
  <div class="basicInfo-container">
    <el-form ref="form" v-model="form" label-width="110px">
      <el-form-item label="词语总数：">
        <el-select v-model="form.wordSum" allow-create>
          <el-option v-for="item in wordSumOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="计时方式：">
        <el-checkbox-group v-model="form.timingMode">
          <el-checkbox label="计时"></el-checkbox>
          <el-checkbox label="倒计时"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- <el-form-item label="计时"></el-form-item> -->
      <el-form-item label="倒计时(s)：">
        <el-select v-model="form.countdownLimit" :disabled="!form.timingMode.includes('倒计时')" allow-create>
          <el-option v-for="item in countdownOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="最大跳过次数：">
        <el-input v-model="form.passLimit"></el-input>
      </el-form-item>
      <el-form-item class="confirm-btn">
        <el-button @click="handleReset">重置</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    this.countdownOptions = [
      { label: '60', value: 60 },
      { label: '180', value: 180 },
      { label: '300', value: 300 },
    ];
    this.wordSumOptions = [
      { label: '20', value: 20 },
      { label: '50', value: 50 },
      { label: '100', value: 100 },
    ]
    return {
      form: {
        countdownLimit: 180,
        wordSum: 50,
        timingMode: ['倒计时'],
        passLimit: 3
      }
      
    }
  },
  created() {
    this.$emit('basic-setting', this.form);
  },
  methods: {
    handleConfirm() {
      this.$emit('basic-setting', this.form);
    },
    handleReset() {
      this.$refs.form.resetField();
    }
  }
}
</script>

<style lang="scss" scoped>
  .basicInfo-container {
    width: 320px;
    padding: 20px 12px 10px 16px;
    border: 1px dashed #008c8c;
    .setting-item {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }
    .confirm-btn {
      text-align: right;
    }
  }
  ::v-deep .el-form {
    .el-form-item__content {
      text-align: left;
    }
  }
  .el-select {
    width: 100%;
  }
</style>