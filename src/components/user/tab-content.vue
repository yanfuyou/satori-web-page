<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="10">
        <div class="content">
          {{ content }}
        </div>
      </el-col>

      <el-col :span="14">
        <div>
          <el-empty
            :image-size="100"
            description="啥也么有"
            v-if="articles.length == 0"
          />
          <el-table :data="articles" style="width: 85%" max-height="250">
            <el-table-column align="center" fixed prop="title" label="标题" width="200" />
            <el-table-column
              align="center"
              prop="createTime"
              label="创建时间"
              width="100"
            />
            <el-table-column align="center" prop="readCount" label="访问量" width="100" />
            <el-table-column align="center" prop="state" label="状态" width="100" />
            <el-table-column align="center" fixed="right" label="操作" width="120">
              <template #default="scope">
                <el-button
                  link
                  type="primary"
                  size="small"
                  @click.prevent="deleteRow(scope.$index)"
                >
                  隐藏
                </el-button>
                <el-button
                  link
                  type="danger"
                  size="small"
                  @click.prevent="deleteRow(scope.$index)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { toRefs, computed } from "vue";
const props = defineProps(["content", "articles"]);

const content = computed(() => {
  return props.content ? props.content : "内容为空";
});

const articles = computed(() => {
  for (let i = 0; i < props.articles.length; i++) {
    props.articles[i].createTime = props.articles[i].createTime.substring(0, 10);
  }
  return props.articles ? props.articles : [];
});
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  .content {
    border: 1px solid #eee;
  }
}
</style>
