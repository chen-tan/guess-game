<template>
  <div class="game-container">
    <div class="answer">
      <div class="count-down">
        
      </div>
      <div class="answer-show">
        <p>已回答: {{ answeredNum }}个，答对: {{ correctNum }}个， 答错: {{ incorrectNum }}个，跳过: {{ passNum }}个</p>
      </div>
      <div class="word-container">
        <div class="card">{{ cardWord }}</div>
        <div class="operate-btn">
          <el-button type="success" size="medium" @click="handleCorrectAnswer">正确</el-button>
          <el-button type="danger" size="medium" @click="handleIncorrectAnswer">错误</el-button>
          <el-button type="warning" size="medium" @click="handlePass">跳过</el-button>
        </div>
        <div class="page-btn">
          <el-button type="primary" @click="handlePrevPage">上一个</el-button>
          <span class="page-info">第{{ showCurIndex }}个 / 共{{ total }}个</span>
          <el-button type="primary" @click="handleNextPage">下一个</el-button>
        </div>
        <div class="result-btn">
          <el-button @click="handleFinish">结束答题</el-button>
          <el-button @click="handleCheckDetail">查看答题明细</el-button>
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
        <div><el-tag class="word-tag" v-for="pass in passList" :key="correct">{{ pass }}</el-tag></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mock from './mock.js'

export default {
  data() {
    this.cardWordList = mock;
    return {
      curIndex: 0,
      correctNum: 0,
      incorrectNum: 0,
      passNum: 0,
      correctList: [],
      incorrectList: [],
      passList: [],
      detailVisible: false
    }
  },
  computed: {
    cardWord() {
      return this.cardWordList[this.curIndex];
    },
    total() {
      return this.cardWordList.length;
    },
    showCurIndex() {
      return this.curIndex + 1;
    },
    answeredNum() {
      return this.incorrectNum + this.correctNum + this.passNum;
    }
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
      this.correctNum++;
      this.handleNextPage();
    },
    handleIncorrectAnswer() {
      this.incorrectList.push(this.cardWordList[this.curIndex]);
      this.incorrectNum++;
      this.handleNextPage();
    },
    handlePass() {
      this.passList.push(this.cardWordList[this.curIndex]);
      this.passNum++;
      this.handleNextPage();
    },
    handleFinish() {

    },
    handleCheckDetail() {
      this.detailVisible = true;
    }
  }
}
</script>

<style lang="scss" scoped>
  .game-container {
    padding-left: 20px;
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
        margin-top: 10px;
      }
      .page-btn {
        margin-top: 20px;
        .page-info {
          margin: 0 20px;
        }
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