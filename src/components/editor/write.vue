<template>
  <div style="border: 1px solid #ccc" class="editor">
    <Toolbar
      v-if="!isDetail"
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 700px; overflow-y: hidden"
      v-model="htmlVal"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
    <el-dialog v-model="selectCategoryFlag" style="width: 500px">
      <div style="display: inline-block">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="彩过的坑"
          placement="top-start"
        >
          <el-icon size="100px" @click="realUp(1)"><MuteNotification /> </el-icon>
        </el-tooltip>
      </div>
      <div style="display: inline-block">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="一条小建议"
          placement="top-start"
        >
          <el-icon size="100px" class="bell" @click="realUp(2)"><Bell /></el-icon>
        </el-tooltip>
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import "@wangeditor/editor/dist/css/style.css";
import {
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  getCurrentInstance,
  watch,
} from "vue";
import { useRouter } from "vue-router";
import { Boot } from "@wangeditor/editor";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { fileUpload } from "@/api/system-api";
import { contentUp } from "@/api/content-api";
import { useUserStore } from "@/store/useUserStore";
import { getDetail } from "@/api/content-api";
const router = useRouter();
const { showToast } = getCurrentInstance().appContext.config.globalProperties;
const userStore = useUserStore();
const props = defineProps(["isDetail", "contentId"]);

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const mode = ref("default");
const toolbarConfig = {
  excludeKeys: ["fullScreen", "insertVideo", "redo", "group-video"],
};
const editorConfig = { placeholder: "请输入内容" };
const htmlVal = ref(null);
const imageServer = ref(null);
const selectCategoryFlag = ref(false);
const waitUpData = ref(null);

//插入图
const setImgServer = (editorConfig) => {
  editorConfig.MENU_CONF["uploadImage"] = {
    async customUpload(file, insertFn) {
      const formData = new FormData();
      formData.append("files", file);
      formData.append("type", "image");
      formData.append("privated", 0);
      fileUpload(formData).then((res) => {
        insertFn(res.data[0].reqUrl, res.data[0].sourceName, res.data[0].reqUrl);
      });
    },
    fieldName: "file",
    maxFileSize: 5 * 1024 * 1024,
  };
};
// 菜单保存按钮
class SaveBtn {
  constructor() {
    this.title = "保存文章";
    // this.iconSvg = '<svg >...</svg>'
    this.tag = "button";
    this.showDropPanel = false;
  }
  getValue(editor) {
    return "";
  }
  isActive(editor) {
    return false; // or true
  }
  isDisabled(editor) {
    return false; // or true
  }
  exec(editor, value) {
    //nn的,这里记得传当前的editor
    //不能在下面使用editorRef获取值,否则二次进入页面会拿不到编辑器的值
    displayVal(editor);
  }
}
//自定义菜单
const Save = {
  key: "save",
  factory() {
    return new SaveBtn();
  },
};

//初始化editor
const handleCreated = (editor) => {
  editorRef.value = editor;
  setImgServer(editorRef.value.getConfig());
  editorRef.value.setHtml("<h1>标题</h1>");
  if (props.isDetail) {
    editorRef.value.getConfig().readOnly = true;
  } else {
    editorRef.value.getConfig().readOnly = false;
  }
  //防止重复添加菜单
  if (-1 == editor.getAllMenuKeys().indexOf("save")) {
    Boot.registerMenu(Save);
  }
  toolbarConfig.insertKeys = {
    index: 30,
    keys: ["save"],
  };
};

//文章内容保存
const displayVal = (editor) => {
  //存在获取到的内容不是最新的问题
  const html = editor.getHtml();
  if (html == null || html == undefined || html == "") {
    showToast(false, "waring", "内容不能为空喔");
    return;
  }
  const title = html.substring(html.indexOf(">") + 1, html.indexOf("</h1>"));
  const data = {
    detail: html,
    categoryId: 1,
    title:
      title == null
        ? html.substring(0, 13)
        : title == undefined
        ? html.substring(0, 13)
        : title == ""
        ? html.substring(0, 13)
        : title,
    createUserId: userStore.getUser.id,
  };
  waitUpData.value = data;
  selectCategoryFlag.value = true;
};

const realUp = (categoryId) => {
  waitUpData.value.categoryId = categoryId;
  contentUp(waitUpData.value).then((res) => {
    showToast(false, "success", "消息已发布到星球啦");
    selectCategoryFlag.value = false;
  });
};

// 模拟 ajax 异步获取内容
onMounted(() => {
  if (props.contentId) {
    getDetail(props.contentId).then((res) => {
      //页面需要优化,考虑直接使用wangEditor的阅读模式,侧面展示用户信息
      htmlVal.value = res.data.detail;
    });
  }
});

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  if (editorRef.value == null) return;
  editorRef.value.destroy();
});

watch(router.currentRoute, (newRoute) => {
  if (newRoute.path === "/write") {
    editorRef.value.clear();
    editorRef.value.getConfig().readOnly = false;
    editorRef.value.setHtml("<h1>标题</h1>");
  }
});
</script>

<style scoped>
.editor {
  width: 80%;
  text-align: center;
  margin: 0 auto;
}
.bell {
  margin-left: 20px;
}
</style>
