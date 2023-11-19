<template>
  <el-timeline-item timestamp="2018/4/12" placement="top" class="time-item">
    <el-card>
      <div class="img-car">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3 text="2xl" justify="center">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="content">
        <h3 class="title">Update Github template</h3>
        <p class="detail">Tom committed 2018/4/12 20:46</p>
        <span class="footer">记录于: {{ defaultAddr }}</span>
      </div>
    </el-card>
  </el-timeline-item>
</template>

<script setup>
import { reactive, toRefs } from "vue";
const props = defineProps(["deesInfo"]);

const state = reactive({
  defaultAddr: "未知",
  now: new Date(),
  deedInfo: {},
});

const { defaultAddr, now, deedInfo } = toRefs(state);
</script>

<style lang="scss" scoped>
.time-item {
  width: 100%;
  .img-car {
    width: 500px;
    float: left;
  }
  .content {
    margin-left: 550px;
    height: 200px;
    width: 45%;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    padding: 0;
    .title {
      margin: 0;
      padding-top: 0px;
      padding-left: 10px;
      position: absolute;
    }
    .detail {
      padding-top: 20px;
      padding-left: 20px;
      height: 130px;
      overflow-y: auto;
    }
    .footer {
      bottom: 5px;
      padding-left: 30px;
    }
  }
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
