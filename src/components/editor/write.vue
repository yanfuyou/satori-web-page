<template>
  <div style="border: 1px solid #ccc" class="editor">
    <Toolbar
      v-if="type !== 'read'"
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>
<script setup>
import "@wangeditor/editor/dist/css/style.css";
import { onBeforeUnmount, ref, shallowRef, onMounted, getCurrentInstance } from "vue";
import { Boot } from '@wangeditor/editor'
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { fileUpload } from "@/api/system-api";
import { contentUp } from "@/api/content-api";
import { useUserStore } from "@/store/useUserStore";
const { showToast } = getCurrentInstance().appContext.config.globalProperties;

const userStore = useUserStore();
const editorType = defineProps({
  type: String,
});
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const mode = "simple";
const toolbarConfig = {
  excludeKeys: ["fullScreen", "insertVideo"],
};
const editorConfig = { placeholder: "请输入内容" };
// 内容 HTML
const valueHtml = ref("");
const imageServer = ref("");
//插入图签
const setImgServer = (editorConfig) => {
  editorConfig.MENU_CONF["uploadImage"] = {
    async customUpload(file, insertFn) {
      const formData = new FormData();
      formData.append("files", file);
      formData.append("type", "image");
      formData.append("privated", 0);
      fileUpload(formData).then((res) => {
        console.log(res.data);
        insertFn(res.data[0].reqUrl, res.data[0].sourceName, res.data[0].reqUrl);
      });
      // insertFn(url, poster)
    },
    fieldName: "file",
    maxFileSize: 5 * 1024 * 1024,
  };
};
class MyMenu {
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
    displayVal()
  }
}
const test = {
  key: "save",
  factory() {
    return new MyMenu();
  },
};
Boot.registerMenu(test);

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
  setImgServer(editor.getConfig());
  editorRef.value.setHtml("<h1>标题</h1>");
  toolbarConfig.insertKeys = {
    index:29,
    keys: ['save']
  }
};

const displayVal = () => {
  const html = editorRef.value.getHtml();
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

  contentUp(data).then((res) => {
    showToast(false, "success", "消息已发布到星球啦");
  });
};

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    // valueHtml.value = "<p>模拟 Ajax 异步设置内容</p>";
  }, 1500);
});

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>

<style scoped>
.editor {
  width: 80%;
  text-align: center;
  margin: 0 auto;
}
</style>
