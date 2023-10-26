<template>
  <div style="border: 1px solid #ccc" class="editor">
    <button @click="displayVal">获取内容</button>
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
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { fileUpload } from "@/api/system-api";
const editorType = defineProps({
  type: String,
});
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const mode = "simple";
const toolbarConfig = {
  excludeKeys: ["fullScreen"],
};
const editorConfig = { placeholder: "请输入内容" };
// 内容 HTML
const valueHtml = ref("");
const imageServer = ref("");
//插入图签
const setImgServer = (editorConfig) => {
  editorConfig.MENU_CONF['uploadImage'] = {
    async customUpload(file, insertFn) {
      const formData = new FormData();
      formData.append("files", file);
      formData.append("type", "image");
      formData.append("privated",0)
      fileUpload(formData).then(res =>{
        console.log(res.data)
        insertFn(res.data[0].reqUrl, res.data[0].sourceName, res.data[0].reqUrl)
      })
        // insertFn(url, poster)
    },
    fieldName: "file",
    maxFileSize: 5 * 1024 * 1024,
  };
};

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
  editorRef.value.setHtml("<h1>标题</h1>");
  setImgServer(editor.getConfig())
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

const displayVal = () => {
  console.log(editorRef.value.getHtml());
};
</script>

<style scoped>
.editor {
  width: 80%;
  text-align: center;
  margin: 0 auto;
}
</style>
