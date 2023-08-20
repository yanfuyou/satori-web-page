<script lang="ts" setup>
import {onMounted, ref} from 'vue'

import scrollTable from '../components/table/scroll-table.vue'

const titleOne = ref('踩过的坑')
const titleMore = ref('更多')

const loading = ref(false)
const currentDate = new Date().toDateString()


function show(str: number) {
  alert(str)
}

const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: '第一篇章',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }
])


</script>

<template>
  <div id="home">
    <el-row>
      <el-col :span="4">
        <div class="grid-content ep-bg-purple none"></div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content ep-bg-purple one-word">一言</div>
      </el-col>
      <el-col :span=9>
        <div class="grid-content ep-bg-purple anno">写公告</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
      </el-col>
      <el-col :span="18">
        <div class="grid-content ep-bg-purple-dark">
          <el-scrollbar>
            <div class="scrollbar-flex-content">
              <el-button v-for="item in 50" :key="item" class="scrollbar-demo-item">
                {{ '分类' + item }}
              </el-button>
            </div>
          </el-scrollbar>
        </div>
      </el-col>
      <el-col :span="2">
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" style="text-align: left;">
        <!--        <el-text class="mx-1">{{ titleOne }} </el-text>-->
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18">
        <el-space direction="vertical" alignment="flex-start">
          <el-skeleton
              style="width: 240px"
              :loading="loading"
              animated
              :throttle="500"
          >
            <template #default>
              <el-card :body-style="{ padding: '0px', marginBottom: '1px' }" v-for="item in 6" :key="item">
                <img
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image"
                />
                <div style="padding: 14px">
                  <span>Delicious hamburger{{ item }}</span>
                  <div class="bottom card-header">
                    <div class="time">{{ currentDate }}</div>
                    <el-button text class="button" @click="show(item);">operation button</el-button>
                  </div>
                </div>
              </el-card>
            </template>
          </el-skeleton>
        </el-space>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" style="text-align: left;">
        <!--        <el-text class="mx-1">{{ titleMore }} </el-text>-->
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <div>
          <scroll-table :table-data="tableData"/>
        </div>
      </el-col>
      <el-col :span="2">
        <el-button-group class="guid-btn">
          <el-button type="warning" plain id="left">
            <el-icon class="el-icon--right">
              <ArrowLeft/>
            </el-icon>
            坑坑
          </el-button>
          <el-button type="success" plain id="right">
            建议
            <el-icon class="el-icon--right">
              <ArrowRight/>
            </el-icon>
          </el-button>
        </el-button-group>
      </el-col>
      <el-col :span="10">
        <div>
          <scroll-table :table-data="tableData"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
#home {
  text-align: center;
}

.el-row {
  margin-bottom: 1px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
  margin: 0 auto;

  .none {
    background-color: snow;
    min-height: 100px;
  }

  .one-word {
    min-height: 100px;
    border: blanchedalmond solid;
  }

  .anno {
    background-color: aqua;
    min-height: 100px;
  }
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}


.scrollbar-flex-content {
  display: flex;
}

.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 40px;
  margin: 5px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}
.guid-btn{
  #left{
    padding-top: 70px;
  }
  #right{
    padding-top: 170px;
  }
}

</style>