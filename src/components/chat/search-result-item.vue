<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="3">
        <div class="grid-content ep-bg-purple">
            <el-avatar shape="square" fit="container" :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        </div>
      </el-col>
      <el-col :span="20" :offset="1">
        <div class="grid-content ep-bg-purple">
            <div>名称</div>
            <dic>类别</dic>
            <div>简介</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup></script>

<style scoped>
.el-row {
  margin-top: 5px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
  background-color: antiquewhite;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  background-color: blueviolet;
}
</style>
