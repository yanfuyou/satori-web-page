<template>
  <div class="deeds-container">
    <div class="new-item">
      <el-row>
        <el-col :span="4" :offset="20">
          <el-button type="info" :icon="EditPen" circle @click="dFlag = true" />
        </el-col>
      </el-row>
    </div>
    <div class="timeline">
      <el-timeline>
        <deed-item v-for="item in deeds" :key="item.id" :deedInfo="item" />
      </el-timeline>
    </div>
    <el-drawer
      v-model="dFlag"
      title="趣事记录表"
      direction="rtl"
      :before-close="handleClose"
    >
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="saveDeed">保存</el-button>
        </div>
      </template>
      <div>
        <el-upload
          v-model:file-list="fileList"
          action=""
          :http-request="upload"
          accept="image/png,image/jpeg"
          list-type="picture-card"
          :limit="6"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="handleChange"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
        <el-form class="deed-info">
          <el-form-item label="事件标题">
            <el-input v-model="deedModel.title" placeholder="事件标题" />
          </el-form-item>
          <el-form-item label="事件发生日期">
            <el-date-picker
              v-model="deedModel.occTime"
              type="datetime"
              placeholder="发生日期"
              size="default"
              value-format="YYYY-MM-DD hh:mm:ss"
            />
          </el-form-item>
          <el-form-item label="事件描述">
            <el-input
              v-model="deedModel.description"
              :rows="3"
              :cols="20"
              type="textarea"
              placeholder="Please input"
            />
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, toRefs, onMounted, reactive } from "vue";
import { EditPen } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import { useRoute } from "vue-router";
import { fileUpload } from "@/api/system-api.js";
import DeedItem from "@/components/pet/deed-item.vue";

import { save, pageList } from "@/api/pet-deeds-api";

const route = useRoute();
const dFlag = ref(false);
const acceptType = ["image/png", "image/jpeg"];
let canUp = true;
const state = reactive({
  deedModel: {
    id: null,
    occTime: null,
    title: null,
    description: null,
    pictures: null,
  },
  deeds: [],
});
const fileList = ref([]);
const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const { deedModel, deeds } = toRefs(state);

onMounted(() => {
  pageList({ page: 0, size: 20, petId: route.query.petId }).then((res) => {
    deeds.value = res.data.records;
  });
});

const handleClose = () => {
  ElMessageBox.confirm("是否保存", {
    showClose: false,
    confirmButtonText: "保存",
    cancelButtonText: "取消",
  })
    .then(() => {
      saveDeed();
    })
    .catch(() => {
      dFlag.value = false;
    });
};

function saveDeed() {
  if (fileList.value.length < 1) {
    return false;
  }
  //收集图片目录
  let picUrl = [];
  fileList.value.forEach((pic) => {
    picUrl.push(pic.reqUrl);
  });
  deedModel.value.pictures = picUrl;
  deedModel.value.petId = route.query.petId;
  save(deedModel.value).then((res) => {
    dFlag.value = false;
  });
}

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
  document.querySelector(".el-upload").style.display = "flex";
};

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};
const handleChange = (uploadFile, uploadFiles) => {
  canUp = true;
  if (!acceptType.includes(uploadFile.raw.type)) {
    console.log("不支持的文件类型");
    uploadFiles.pop();
    canUp = false;
    return false;
  }
  if (fileList.value.length == 5) {
    document.querySelector(".el-upload").style.display = "none";
  }
};
const upload = (uploadFile) => {
  if (canUp) {
    const formData = new FormData();
    formData.append("files", uploadFile.file);
    formData.append("type", "image");
    fileUpload(formData)
      .then((res) => {
        fileList.value[fileList.value.length - 1].reqUrl = res.data[0].reqUrl;
      })
      .catch((err) => {
        fileList.value.pop();
      });
  }
};
</script>

<style lang="scss" scoped>
.deeds-container {
  margin-left: 200px;
  .new-item {
    height: 60px;
    margin-top: 5px;
  }
  .deed-info {
    margin-top: 10px;
  }
}
</style>
