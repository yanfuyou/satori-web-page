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
        <deed-item v-for="item in 10" />
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
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { EditPen } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import { useRoute } from "vue-router";
import { fileUpload } from "@/api/system-api.js";
import DeedItem from "@/components/pet/deed-item.vue";

const route = useRoute();
const dFlag = ref(false);
const acceptType = ["image/png", "image/jpeg"];
let canUp = true;

const fileList = ref([]);
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const handleClose = () => {
  ElMessageBox.confirm("是否保存", {
    showClose: false,
    confirmButtonText: "保存",
    cancelButtonText: "取消",
  })
    .then(() => {
      alert("确认");
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
  let picUrl = "";
  fileList.value.forEach((pic) => {
    picUrl += "," + pic.reqUrl;
  });
  console.log(picUrl);
  console.log(route.query);
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
}
</style>
