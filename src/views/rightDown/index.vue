<template>
  <div class="container">
    <div class="el-submenu"
      :style="{width: `${menuWidth}px`}"
      @mouseenter="handleHover"
      @mouseleave="handleLeave"
    >
      <div
        class="el-submenu__title"
        style="border-bottom-color: transparent; color: rgb(255, 255, 255); background-color: rgb(84, 92, 100);"      
      >
        选项4
        <i class="el-submenu__icon-arrow el-icon-arrow-right"></i>
      </div>
      <div
        class="el-menu--horizontal"
        style="position: absolute; top: 0px; left: 0px; z-index: 2119;"
        x-placement="right-start"
        :style="panelClass"
      >
        <ul
          role="menu"
          class="el-menu el-menu--popup el-menu--popup-right-start"
          style="background-color: rgb(84, 92, 100);"
        >
          <li
            role="menuitem"
            tabindex="-1"
            class="el-menu-item"
            style="color: rgb(255, 255, 255); background-color: rgb(84, 92, 100);"
          >选项1</li>
          <li
            role="menuitem"
            tabindex="-1"
            class="el-menu-item"
            style="color: rgb(255, 255, 255); background-color: rgb(84, 92, 100);"
          >选项2</li>
          <li
            role="menuitem"
            tabindex="-1"
            class="el-menu-item"
            style="color: rgb(255, 255, 255); background-color: rgb(84, 92, 100);"
          >选项3</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuWidth: '200',
      panelClass: { display: 'none', left: '0px' }
    }
  },
  methods: {
    handleHover() {
      console.log('xxx');
      this.panelClass = {
        display: 'block',
        left: `${this.menuWidth - 5}px`
      }
    },
    handleLeave() {
      this.panelClass = { display: 'none', left: '0px' }
    }
  }
};
</script>

<style lang="scss" scoped>
  .container {
    padding: 20px;
    .el-submenu {
      position: relative;
    }
  }
</style>