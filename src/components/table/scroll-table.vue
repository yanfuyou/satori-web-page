<template>
  <el-table :data="props.tableData" height="250" style="width: 100%">
    <el-table-column prop="date" label="发布日期" width="100"/>
    <el-table-column prop="name" label="发布者" width="80"/>
    <el-table-column prop="address" label="关键词"/>
  </el-table>
</template>

<script setup>
const props = defineProps({
  tableData: Array
})
</script>
