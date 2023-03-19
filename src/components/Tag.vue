<template>
<div class="greetings" :title="appData.tagList[id].value">
  <button v-html="appData.tagList[id].label"
          :aria-selected="appData.tagList[id].selected"
          @click="appData.tagList[id].selected=!appData.tagList[id].selected"></button>
</div>
</template>

<script setup lang="ts">
defineProps<{
  id: number,
  // item: {
  //   label: String,
  //   value: String,
  //   category: Number,
  //   selected: Boolean
  // }
}>();

const selected = ref(false);

import {onMounted, reactive, ref, watch, watchEffect} from "vue";

const click = () => {
}

onMounted(() => {
  // const url = new URL(location.href);
  // robj.poji = url.searchParams.get("poji");
  // robj.nega = url.searchParams.get("nega");
})
</script>

<style scoped lang="scss">
button {
  &[aria-selected="true"] {
    background-color: #1d4ed8;
    color: white;
  }
}
</style>
