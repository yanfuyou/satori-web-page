<template>
  <div id="home">
    <el-row>
      <el-col :span="3">
        <div class="grid-content ep-bg-purple none"></div>
      </el-col>
      <el-col :span="13">
        <div class="grid-content ep-bg-purple one-word" @click="changeWords">
          <table class="hitokoto">
            <tr>
              <td>
                <el-text>{{ covertWords.hitokoto }}</el-text>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <el-text
                  >@{{ covertWords.from_who == null ? "陌生人" : covertWords.from_who
                  }}{{ "<<" + covertWords.from + ">>" }}</el-text
                >
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>
                <el-text>{{ covertWords.created_at }}</el-text>
              </td>
            </tr>
          </table>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content ep-bg-purple anno">
          <div v-html="noticeHtml"></div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2"> </el-col>
      <el-col :span="18">
        <div class="grid-content ep-bg-purple-dark">
          <el-scrollbar>
            <div class="scrollbar-flex-content">
              <el-button v-for="item in 50" :key="item" class="scrollbar-demo-item">
                {{ "分类" + item }}
              </el-button>
            </div>
          </el-scrollbar>
        </div>
      </el-col>
      <el-col :span="2"> </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" style="text-align: left">
        <!--        <el-text class="mx-1">{{ titleOne }} </el-text>-->
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18">
        <el-space direction="vertical" alignment="flex-start">
          <el-skeleton style="width: 240px" :loading="loading" animated :throttle="500">
            <template #default>
              <el-card
                :body-style="{ padding: '0px', marginBottom: '1px' }"
                v-for="item in 6"
                :key="item"
              >
                <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="image"
                />
                <div style="padding: 14px">
                  <span>Delicious hamburger{{ item }}</span>
                  <div class="bottom card-header">
                    <div class="time">{{ currentDate }}</div>
                    <el-button text class="button" @click="show(item)"
                      >operation button</el-button
                    >
                  </div>
                </div>
              </el-card>
            </template>
          </el-skeleton>
        </el-space>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" style="text-align: left">
        <!--        <el-text class="mx-1">{{ titleMore }} </el-text>-->
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <div>
          <scroll-table @loadMore="loadMore" :table-data="tableData" ref="tableOne"/>
        </div>
      </el-col>
      <el-col :span="2">
        <el-button-group class="guid-btn">
          <el-button type="warning" plain id="left">
            <el-icon class="el-icon--right">
              <ArrowLeft />
            </el-icon>
            坑坑
          </el-button>
          <el-button type="success" plain id="right">
            建议
            <el-icon class="el-icon--right">
              <ArrowRight />
            </el-icon>
          </el-button>
        </el-button-group>
      </el-col>
      <el-col :span="10">
        <div>
          <scroll-table :table-data="tableData" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref, reactive, computed } from "vue";
import scrollTable from "../components/table/scroll-table.vue";
import { getParamValueByName, requestThirdUrlGet } from "../api/system-api.js";
import { contentListPage } from "../api/content-api";
import { useSystemStore } from "../store/useSystemStore";
const tableOne = ref();
const systemStore = useSystemStore();
const titleOne = ref("踩过的坑");
const titleMore = ref("更多");
const beautyWords = reactive({
  created_at: "1696014986",
  from: "",
  from_who: "",
  hitokoto: "",
});
const loading = ref(false);
const currentDate = new Date().toDateString();
let timerId;

const pageRequest = {
  page: 1,
  size: 10,
  keyWord: null,
  startTime: null,
  endTime: null,
};

const covertWords = computed(() => {
  const { created_at } = beautyWords;
  const date = new Date(Number(created_at + "000"));
  beautyWords.created_at =
    date.getFullYear() +
    "/" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    date.getDate().toString().padStart(2, "0") +
    " " +
    date.getHours().toString().padStart(2, "0") +
    ":" +
    date.getMinutes().toString().padStart(2, "0") +
    ":" +
    date.getSeconds().toString().padStart(2, "0");
  return beautyWords;
});
const noticeHtml = ref("");

const loadMore = (type) => {
  pageRequest.page++;
  getTableDate(type);
};

onMounted(() => {
  getParamValueByName("hitokoto_url").then((res) => {
    systemStore.updateBeautyWordsUrl(res.data);
  });
  changeWords();
  timerId = setInterval(() => {
    changeWords();
  }, 2000);
  //获取服务器文本
  noticeHtml.value =
    "<p>你说啥呢<a href='https://www.baidu.com'>百度</a></p>" +
    "<button plain onclick='alert()'>Plain</button>";

  //拉取表格数据
  tableData.value = [];
  getTableDate(0);
});

onBeforeUnmount(() => {
  clearInterval(timerId);
});

const changeWords = () => {
  //随机选择类型
  const wordsType = systemStore.getBeautyWordsType;
  const params = {
    isThird: "1",
    c: wordsType[Math.floor(Math.random() * wordsType.length)],
    charset: "UTF-8",
  };

  requestThirdUrlGet(systemStore.getBeautyWordsUrl, params).then((res) => {
    beautyWords.created_at = res.created_at;
    beautyWords.from = res.from;
    beautyWords.from_who = res.from_who;
    beautyWords.hitokoto = res.hitokoto;
  });
};

function show(str: number) {
  alert(str);
}

const getTableDate = (type: number) => {
  contentListPage(pageRequest).then((res) => {
    if (res.data.records.length > 0) {
      for (let c of res.data.records) {
        tableData.value.push({
          date:
            c.createTime.substring(0, 11).replace("-", "年").replace("-", "月") + "日",
          name: c.createUserId,
          address: c.title,
        });
      }
    }
  });
};
const tableData = ref([{}]);
</script>

<style scoped>
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

  .one-word,
  .anno {
    text-align: center;
    height: 100px;
    border: blanchedalmond solid;
    .el-text {
      font-family: "STXingkai";
    }
    .hitokoto {
      margin: 10px auto auto 10px;
    }
  }

  .anno {
    text-align: left;
    width: 380px;
    margin-left: 20px;
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
.guid-btn {
  #left {
    padding-top: 70px;
  }
  #right {
    padding-top: 170px;
  }
}
</style>
