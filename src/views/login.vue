<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="grid-content ep-bg-purple">
        <el-image style="width: 100%; height: 100%" :src="seat" />
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content ep-bg-purple">
        <el-form :inline="false" :model="requestBody" class="demo-form-inline">
          <el-form-item>
            <el-input
              v-model="requestBody.userName"
              class="w-50 m-2"
              placeholder="账号"
              autofocus="true"
              @blur="checkUserName"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="requestBody.nikeName"
              class="w-50 m-2"
              placeholder="昵称"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="requestBody.password"
              class="w-50 m-2"
              placeholder="密码"
            />
          </el-form-item>
          <el-form-item v-if="currentEvent === 'signUp'">
            <el-input
              v-model="requestBody.repeatPassword"
              class="w-50 m-2"
              placeholder="重复密码"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="requestBody.validationCode"
              class="w-50 m-2"
              placeholder="验证码"
              style="width: 50%;"
            />
            <div @click="changeCode">
            <el-image  style="width: 150px; height: 60px" :src="'data:image/png;base64,' + captCode" />
            </div>
          </el-form-item>
          <el-form-item v-if="currentEvent === 'signIn'">
            <el-button type="primary" @click="signUpSubmit">登录</el-button>
            <el-text size="small" @click="currentEvent = 'signUp'">没有账号,注册一个</el-text>
          </el-form-item>
          <el-form-item v-else>
            <el-button type="primary" @click="signUpSubmit">注册</el-button>
            <el-text size="small" @click="currentEvent = 'signIn'">返回登录</el-text>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script type="ts" setup>
import { ref,reactive,onMounted,getCurrentInstance } from "vue";
import { useUserStore } from "../store/useUserStore";
import router from "../router";
import { signOut, signUp } from "../api/user-api.js";
import seat from "@/assets/img/seat.png";
import { getCaptcha } from '../api/system-api';
import { alertProps } from "element-plus";
const { showTost } = getCurrentInstance().appContext.config.globalProperties

const captCode = ref('')
const currentEvent = ref('signIn');
const requestBody = reactive({
  userName: '',
  nikeName: '',
  password: '',
  validationCode: '',
  repeatPassword:''
});
//规则校验函数
const ruleStr = /^[a-zA-Z0-9_]*$/g;
const checkUserName = ()=>{
  if(requestBody.userName === ''){
    showTost(false,'error','账号不能为空');
    return false;
  }else if(!ruleStr.test(requestBody.userName)){
    showTost(false,'error','账号只能为数字字母下划线的组合');
    return false;
  }
}

const signUpSubmit = () => {
  if (
    requestBody.userName == "" ||
    requestBody.nikeName == "" ||
    requestBody.password == "" ||
    requestBody.validationCode == ""
  ) {
    showTost(false,'error','参数不能为空')
    return false;
  }
  const result = signUp(requestBody);
  console.log(result);
};



const changeCode = () => {
  getCaptcha().then(res => {
    captCode.value = res.data;
  });
}

onMounted(()=>{
  changeCode();
})
</script>

<style scoped>
.el-text{
  margin-top: 10px;
  padding-bottom: 0;
}
</style>