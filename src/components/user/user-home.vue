<template>
  <div>
    <!-- 我的宠物 -->
    <el-row :gutter="10" class="pet">
      <div class="pet-title">宠物纪</div>
      <div class="pet-content">
        <el-card :body-style="{ padding: '0px' }" v-for="index in 5" :key="index">
          <img
            v-if="pets[index]"
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <img v-else :src="defaultAddImg" class="image" />
          <div style="padding: 14px" v-if="pets[index]">
            <span>Yummy hamburger</span>
            <div class="bottom">
              <time class="time">{{ currentDate }}</time>
            </div>
          </div>
          <div style="padding: 14px" v-else>
            <span>圣火喵喵</span>
            <div class="bottom">
              <time class="time">{{ "添加您的宠物" }}</time>
            </div>
          </div>
        </el-card>
      </div>
    </el-row>
    <el-divider border-style="dashed" />
    <!-- 内容信息 -->
    <el-row :gutter="20" class="history">
      <el-col>
        <el-tabs :tab-position="tabPosition" style="height: 200px" class="demo-tabs">
          <el-tab-pane label="User">
            <tab-content :content="tabs[0]" :articles="articles" />
          </el-tab-pane>
          <el-tab-pane label="Config">Config</el-tab-pane>
          <el-tab-pane label="Role">Role</el-tab-pane>
          <el-tab-pane label="Task">Task</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import petCategory from "@/components/user/pet-category.vue";
import tabContent from "@/components/user/tab-content.vue";
import defaultAddImg from "@/assets/img/pet.png";

import { reactive, toRefs } from "vue";

const state = reactive({
  //宠物列表
  pets: [],
  currentDate: new Date(),
  tabPosition: "left",
  tabs: ["user", "config", "role", "task"],
  articles: [
    // {
    //   title: "User",
    //   createTime: "2021-07-07 10:30",
    //   readCount: 100,
    //   state: 1,
    // },
  ],
});

const { pets, currentDate, tabPosition, tabs, articles } = toRefs(state);
</script>
<style lang="scss" scoped>
.pet {
  height: 350px;

  .pet-title {
    height: 50px;
    font-family: "liuJianMaoCao";
    font-size: 40px;
    margin: 0 auto;
  }
  .pet-content {
    width: 100%;
    margin-top: 0;
    display: flex;
    justify-content: center;
    .el-card {
      height: 100%;
      width: 15%;
      margin-right: 30px;
    }
  }
}

.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>
