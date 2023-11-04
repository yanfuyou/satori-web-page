<template>
  <div>
    <el-table :data="props.tableData" height="250" style="width: 100%" ref="tableRef" @row-click="jumpToDetail">
      <el-table-column prop="date" label="发布日期" width="150" />
      <el-table-column prop="name" label="发布者" width="80" />
      <el-table-column prop="address" label="关键词" />
    </el-table>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue";
import router from '@/router'

const props = defineProps({
  tableData: Array,
});

const emit = defineEmits(["loadMore"]);

const tableRef = ref();
const jumpToDetail = (row)=>{
  router.push('/detail?contentId=' + row.id)
}
const bodyEvent=(e)=> {
  const scrollDirection = e.deltaY > 0 ? "down" : "up";
  if (scrollDirection === "down") {
    // 获取提供实际滚动的容器
    const dom = tableRef.value.$refs.bodyWrapper.getElementsByClassName(
      "el-scrollbar__wrap"
    )[0];

    const { clientHeight, scrollTop, scrollHeight } = dom;
    // 父容器高度 + 子容器距离父容器顶端的高度 = 子容器可滚动的高度
    if (clientHeight + scrollTop === scrollHeight) {
      console.log("竖向滚动条已经滚动到底部");
    }
  }
}
const getTableData = () =>{
  this.loading = true;
  axios
    .get(url)
    .then((res) => {
      if (res.data) {
        //pageSize为页码，isEnd 判断是否请求完所有数据了
        if (res.data.length == this.pageSize) {
          this.isEnd = false;
        } else {
          this.isEnd = true;
        }
      }
    })
    .finally(() => {
      this.loading = false;
    });
}
onMounted(() => {
  tableRef.value &&
    tableRef.value.$refs.bodyWrapper.addEventListener("mousewheel", bodyEvent);
});
</script>
