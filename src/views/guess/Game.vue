<template>
  <div class="game-container">
    <div class="answer">
      <div class="game-state">
        <span v-if="isPause" class="state-text">暂停中。。。。。。</span>
        <span v-else-if="isStart" class="state-text">答题中。。。。。。</span>        
        <span v-else class="state-text">等待开始。。。。。。</span>
      </div>
      <Countdown v-if="timingMode.includes('倒计时')" ref="countdown" mode="s" :total="countdownTotal" @timeout="handleTimeout" />
      <div class="answer-show">
        <p>已回答: {{ answeredNum }}个，答对: {{ correctNum }}个， 答错: {{ incorrectNum }}个，跳过: {{ passNum }}个</p>
      </div>
      <div class="word-container">
        <div class="card">{{ cardWord }}</div>
        <div class="page-btn">
          <el-button-group>
            <el-button type="primary" icon="el-icon-arrow-left" @click="handlePrevPage">上一页</el-button>
            <el-button type="primary" @click="handleNextPage">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          </el-button-group>
          <span class="page-info">第{{ showCurIndex }}个 / 共{{ wordTotal }}个</span>
          <!-- <el-button circle icon="el-icon-arrow-left" @click="handlePrevPage"></el-button> -->
          <!-- <el-button circle icon="el-icon-arrow-right" @click="handleNextPage"></el-button> -->
        </div>
        <div class="operate-btn">
          <el-button type="success" size="medium" :disabled="!isStart || isPause" @click="handleCorrectAnswer">正确</el-button>
          <el-button type="danger" size="medium" :disabled="!isStart || isPause" @click="handleIncorrectAnswer">错误</el-button>
          <el-button type="warning" size="medium" :disabled="!isStart || isPause || passNum >= passLimit" @click="handlePass">跳过</el-button>
          <el-button type="warning" size="medium" :disabled="!isStart" @click="handlePause">{{ isPause ? '继续' : '暂停' }}</el-button>
        </div>
        <div class="result-btn">
          <el-button @click="handleStart">开始答题</el-button>
          <el-button @click="handleFinish">结束答题</el-button>
          <el-button @click="handleCheckDetail">查看答题明细</el-button>
          <el-button @click="handleReset">清除数据</el-button>
        </div>
      </div>
    </div>
    <el-dialog
      title="答题明细"
      :center="false"
      :visible="detailVisible"
      @close="detailVisible = false"
     >
      <div>您一共答了{{ answeredNum }}道题，其中，答对: {{ correctNum }}个， 答错: {{ incorrectNum }}个，跳过: {{ passNum }}个</div>
      <div class="correct-list">
        <p>您答对的题有：</p>
        <div><el-tag class="word-tag" v-for="correct in correctList" :key="correct">{{ correct }}</el-tag></div>
      </div>
      <div class="incorrect-list">
        <p>您答错的题有：</p>
        <div><el-tag class="word-tag" v-for="incorrect in incorrectList" :key="incorrect">{{ incorrect }}</el-tag></div>
      </div>
      <div class="pass-list">
        <p>您跳过的题有：</p>
        <div><el-tag class="word-tag" v-for="pass in passList" :key="pass">{{ pass }}</el-tag></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mock from './mock.js'
import Countdown from '@/components/Countdown'

export default {
  components: { Countdown },
  props: {
    passLimit: {
      type: Number,
      default: 5
    },
    countdownLimit: {
      type: Number,
      default: 300
    },
    timingMode: {
      type: Array,
      default: ['计时','倒计时']
    }
  },
  data() {
    this.cardWordList = mock;
    this.stateOptions = [
      { state: 'isStart', icon: 'el-icon-loading', text: '答题中' },
      { state: 'isPause', icon: 'el-icon-more', text: '暂停中' },
      { state: 'isWait', icon: 'wait', text: '等待中' },
    ]
      new Map([
      ['isStart', 'el-icon-loading'],
      ['isPause', 'el-icon-more']
    ])
    return {
      curIndex: 0,
      correctList: [],
      incorrectList: [],
      passList: [],
      detailVisible: false,
      isStart: false,
      isPause: false,
      countdownTotal: 0,
      stateIcon: '',
      countdownKey: new Date().getTime()
    }
  },
  computed: {
    cardWord() {
      return this.cardWordList[this.curIndex];
    },
    correctNum() {
      return this.correctList.length;
    },
    incorrectNum() {
      return this.incorrectList.length;
    },
    passNum() {
      return this.passList.length;
    },
    wordTotal() {
      return this.cardWordList.length;
    },
    showCurIndex() {
      return this.curIndex + 1;
    },
    answeredNum() {
      return this.incorrectNum + this.correctNum + this.passNum;
    }
  },
  watch: {
    passNum(val) {
      if(this.passLimit === val) {
        this.$notify.warning({ message: `您共有${val}次跳过机会，这已经是第${val}次了！`, duration: 3000 });
      }
    },
    countdownLimit: {
      handler(val) {
        this.countdownTotal = val;
      },
      immediate: true
    }
  },
  created() {

  },
  methods: {
    handlePrevPage() {
      if(this.curIndex > 0) {
        this.curIndex--;
      } else {
        this.curIndex = 0;
        this.$message.warning('已经是第一页啦！');
      }
    },
    handleNextPage() {
      if(this.curIndex < this.cardWordList.length - 1) {
        this.curIndex++;
      } else {
        this.curIndex = this.cardWordList.length -1;
        this.$message.warning('已经是最后一页啦！');
      }
    },
    handleCorrectAnswer() {
      this.correctList.push(this.cardWordList[this.curIndex]);
      this.handleNextPage();
    },
    handleIncorrectAnswer() {
      this.incorrectList.push(this.cardWordList[this.curIndex]);
      this.handleNextPage();
    },
    handlePass() {
      this.passList.push(this.cardWordList[this.curIndex]);
      this.handleNextPage();
    },
    handleStart() {
      this.handleReset();
      this.isStart = true;
      this.isPause = false;
      this.$refs.countdown?.handleStart();
    },
    handlePause() {
      this.isPause = !this.isPause;
      if(this.isPause) {
        this.$refs.countdown.handlePause();
      } else {
        this.$refs.countdown.handleContinue();
      }
    },
    handleFinish() {
      this.isStart = false;
      this.$refs.countdown.handlePause();
    },
    handleCheckDetail() {
      this.detailVisible = true;
    },
    handleReset() {
      this.correctList = [];
      this.incorrectList = [];
      this.passList = [];
      this.$refs.countdown.handleInit();
    },
    handleTimeout() {
      this.$message.error('计时结束')
    }
  }
}
</script>

<style lang="scss" scoped>
  .game-container {
    padding-left: 20px;
    ::v-deep .countdown{
      text-align: left;
      color: #2c73b9;
    }
    .answer-show {
      text-align: left;
    }
    .game-state {
      margin-bottom: 20px;
      .state-text {
        font-size: 24px;
      }
    }
    .word-container {
      .card {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 600px;
        height: 300px;
        background-color: #111;
        font-size: 84px;
        color: #eee;
        overflow: visible;
      }
      .operate-btn {
        margin-top: 20px;
      }
      .page-btn {
        margin-top: 5px;
        .page-info {
          margin: 0 20px;
        }
      }
      .result-btn {
        margin-top: 20px;
      }
    }
    ::v-deep .el-dialog__wrapper {
      text-align: left;
      .el-dialog__body {
        max-height: 60vh;
        overflow-y: scroll;
      }
    }
    .word-tag {
      margin-right: 5px;
    }
  }
</style>