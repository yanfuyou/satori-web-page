<template>
  <div>
    <el-popover :visible="showFlag" placement="top" :width="160">
      <p>{{ tips }}</p>
      <div style="text-align: right; margin: 0">
        <el-button size="small" text @click="showFlag = false">稍后</el-button>
        <el-button size="small" type="primary" @click="add(result)">确认</el-button>
      </div>
      <template #reference>
        <el-row :gutter="20" @click="showFlag = true">
          <el-col :span="3">
            <div class="grid-content ep-bg-purple">
              <el-avatar shape="square" fit="container" :size="50" :src="result.avatar" />
            </div>
          </el-col>
          <el-col :span="20" :offset="1">
            <div class="grid-content ep-bg-purple result-text">
              <div class="name">{{ result.name }}</div>
              <div v-if="result.resultType === 'group'" class="desc">
                {{ result.desc }}
              </div>
              <div v-else class="desc">{{ result.email }}</div>
              <div class="create-time">{{ result.createTime }}</div>
            </div>
          </el-col>
        </el-row>
      </template>
    </el-popover>
  </div>
</template>

<script setup type="ts">
import { computed, ref, getCurrentInstance } from "vue";
import { addFriend, joinGroup } from "../../api/user-api";
import { useUserStore } from "../../store/useUserStore";
const userStore = useUserStore();
const props = defineProps(["result"]);
const showFlag = ref(false);
const { showToast } = getCurrentInstance().appContext.config.globalProperties;

const result = computed(() => {
  return props.result;
});

const tips = computed(() => {
  return props.result.resultType === "user" ? "加为好友？" : "加入群聊？";
});

const add = (friend) => {
  if (friend.resultType === "user") {
    addFriend({
      userId: userStore.getUser.id,
      userFriendId: friend.id
    }).then((res) => {
      showToast(false,'success','添加成功');
      showFlag.value = false;
    });
  } else {
    joinGroup({
      userId: userStore.getUser.id,
      groupId:friend.id
    }).then(res => {
      showToast(false,'success','恭喜你成为其中一员');
      showFlag.value = false;
    })
  }
};
</script>

<style scoped>
.el-row {
  margin-top: 5px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
  .result-text {
    text-align: left;
  }
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  .name {
    font-weight: bold;
  }
  .create-time,
  .desc {
    font-weight: 20;
  }
}
</style>
