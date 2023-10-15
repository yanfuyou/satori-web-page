<template>

  <div id="footer-content" v-html="footerHtml">
  </div>
</template>
<script setup>
import { ref,computed } from 'vue';

const footerHtml = computed(()=>{
  const html = '<span>&copy ' + new Date().getFullYear() + ' cat_y' + '</span>';
  return html;
})
</script>

<style scoped>
</style>