<template>
  <div>
    <!-- 我的宠物 -->
    <el-row :gutter="10" class="pet">
      <div class="pet-title">宠物纪</div>
      <div class="pet-content">
        <el-card
          :body-style="{ padding: '0px' }"
          v-for="index in 5"
          :key="index"
          class="container-f"
          @click="toDeeds(pets[index - 1] ? pets[index - 1].id : -1)"
        >
          <img v-if="pets[index - 1]" :src="pets[index - 1].avatar" class="image" />
          <img v-else :src="defaultAddImg" class="image" />
          <div class="overlay">
            <div>
              <label :for="'fileInput' + index">
                <el-icon :size="iconSize" color="green" class="icon"><Picture /></el-icon>
              </label>
              <input
                type="file"
                :id="'fileInput' + index"
                @change.stop="handleUp($event, index - 1)"
              />
            </div>
            <el-icon
              v-if="pets[index - 1]"
              :size="iconSize"
              color="#64fadf"
              class="icon"
              @click.stop="edit(index - 1)"
            >
              <Edit />
            </el-icon>

            <el-icon
              v-if="pets[index - 1]"
              :size="iconSize"
              color="red"
              class="icon"
              @click.stop="del(pets[index - 1].id, index - 1)"
              ><CircleClose
            /></el-icon>
          </div>
          <div style="padding: 14px" v-if="pets[index - 1]">
            <span>{{ pets[index - 1].alias }}</span>
            <div class="bottom">
              <time class="time">{{ pets[index - 1].description }}</time>
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

  <el-dialog v-model="dFlag" title="友伴基本信息" width="450px">
    <el-form :model="petInfo" size="small">
      <el-form-item label="称呼" :label-width="formLabelWidth">
        <el-input
          v-model="petInfo.alias"
          autocomplete="off"
          class="w-50 m-2"
          size="large"
        />
      </el-form-item>
      <el-form-item label="生日" :label-width="formLabelWidth">
        <el-date-picker
          v-model="petInfo.birthday"
          type="date"
          placeholder="选择日期"
          size="large"
          value-format="YYYY-MM-DD 00:00:00"
        />
      </el-form-item>
      <el-form-item label="简介" :label-width="formLabelWidth">
        <el-input
          v-model="petInfo.description"
          autosize
          type="textarea"
          placeholder="简介"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dFlag = false">Cancel</el-button>
        <el-button type="primary" @click="savePet"> 保存 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import petCategory from "@/components/user/pet-category.vue";
import tabContent from "@/components/user/tab-content.vue";
import defaultAddImg from "@/assets/img/pet.png";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "vue-router";

import { ref, reactive, toRefs, onMounted, getCurrentInstance } from "vue";
import { fileUpload } from "@/api/system-api.js";
import { addPet, editPet, delPet, listPet } from "@/api/pet-api.js";

const userStore = useUserStore();
const router = useRouter();

const acceptType = ["image/jpeg", "image/png", "image/gif"];
const { showToast } = getCurrentInstance().appContext.config.globalProperties;
const formLabelWidth = ref("100px");
let tempUrl = null;
let tempIdx = null;
const state = reactive({
  iconSize: 20,
  //宠物列表
  pets: [],
  currentDate: new Date(),
  tabPosition: "left",
  tabs: ["user", "config", "role", "task"],
  articles: [],
  petInfo: {
    id: null,
    ownerId: null,
    alias: null,
    description: null,
    avatar: null,
    age: null,
    birthday: null,
  },
  dFlag: false,
});

const {
  iconSize,
  pets,
  currentDate,
  tabPosition,
  tabs,
  articles,
  petInfo,
  dFlag,
} = toRefs(state);

onMounted(async () => {
  await initPets();
  showUp();
});
const handleUp = async (e, idx) => {
  tempIdx = idx;
  if (e.target.files.length === 0) {
    showToast(false, "warning", "选个头像吧");
    return false;
  }
  const file = e.target.files[0];

  if (!acceptType.includes(file.type)) {
    showToast(false, "warning", "只能上传jpg,png,gif");
    return false;
  }
  const formData = new FormData();
  formData.append("files", file);
  formData.append("type", "image");
  await fileUpload(formData).then((res) => {
    if (pets.value[idx]) {
      //更新,copy一下几个必填项
      petInfo.value.id = pets.value[idx].id;
      petInfo.value.avatar = res.data[0].reqUrl;
      petInfo.value.alias = pets.value[idx].alias;
      petInfo.value.description = pets.value[idx].description;
      petInfo.value.ownerId = pets.value[idx].ownerId;
      editPet(petInfo.value).then(() => {
        pets.value[idx].avatar = res.data[0].reqUrl;
      });
    } else {
      //暂存等待创建
      dFlag.value = true;
      tempUrl = res.data[0].reqUrl;
    }
  });
};

const showUp = () => {
  const containers = document.querySelectorAll(".container-f");
  const overlays = document.querySelectorAll(".overlay");
  for (let i = 0; i < containers.length; i++) {
    overlays[i].style.display = "none";
    containers[i].addEventListener("mouseenter", () => {
      overlays[i].style.display = "flex";
    });
    containers[i].addEventListener("mouseleave", () => {
      overlays[i].style.display = "none";
    });
  }
};
const edit = (idx) => {
  tempIdx = idx;
  if (pets.value[tempIdx]) {
    petInfo.value.id = pets.value[tempIdx].id;
    petInfo.value.ownerId = pets.value[tempIdx].ownerId;
    petInfo.value.alias = pets.value[tempIdx].alias;
    petInfo.value.description = pets.value[tempIdx].description;
    petInfo.value.avatar = pets.value[tempIdx].avatar;
    petInfo.value.age = pets.value[tempIdx].age;
    petInfo.value.birthday = pets.value[tempIdx].birthday;
  }
  dFlag.value = true;
};
const savePet = () => {
  if (pets.value[tempIdx]) {
    //表示在修改已有
    petInfo.value.id = pets.value[tempIdx].id;
    petInfo.value.age = new Date().getFullYear() - petInfo.value.birthday.substring(0, 4);
    editPet(petInfo.value).then((res) => {
      pets.value[tempIdx].alias = petInfo.value.alias;
      pets.value[tempIdx].description = petInfo.value.description;
      pets.value[tempIdx].birthday = petInfo.value.birthday;
      dFlag.value = false;
      petInfo.value = {
        id: null,
        ownerId: null,
        alias: null,
        description: null,
        avatar: null,
        age: null,
        birthday: null,
      };
    });
  } else {
    petInfo.id = null;
    petInfo.value.avatar = tempUrl;
    petInfo.value.age = new Date().getFullYear() - petInfo.value.birthday.substring(0, 4);
    petInfo.value.ownerId = userStore.getUser.id;
    addPet(petInfo.value).then((res) => {
      petInfo.value.id = res.data;
      pets.value.push(petInfo.value);
      tempIdx = null;
      tempUrl = null;
      dFlag.value = false;
      petInfo.value = {
        id: null,
        ownerId: null,
        alias: null,
        description: null,
        avatar: null,
        age: null,
        birthday: null,
      };
    });
  }
};

const initPets = async () => {
  listPet(userStore.getUser.id).then((res) => {
    pets.value = res.data;
  });
};

const del = (id, idx) => {
  console.log(id, idx);
  delPet(id).then((res) => {
    pets.value.splice(idx, 1);
  });
};
//跳转至时间线
const toDeeds = (petId) => {
  if (petId == -1) {
    return false;
  }
  router.push({ path: "/pet/deeds", query: { petId } });
};
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
  height: 140px;
  width: 100%;
  display: block;
}

.container-f {
  position: relative;
}
.overlay {
  display: none;
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.overlay:hover {
  display: flex;
}
input[type="file"] {
  opacity: 0;
  position: absolute;
  width: 10px;
}

label {
  padding: 0;
  color: #fff;
  cursor: pointer;
}

.icon {
  margin-left: 10px;
}
</style>
