<template>
<div class="greetings" :title="storage.tagList[uid].value">
  <button v-html="setting?'☓':storage.tagList[uid].label"
          :aria-selected="appData.selectList[uid]"
          @click="appData.selectList[uid]=!appData.selectList[uid]"
          @click.right.prevent="setting=!setting"
          style="user-select: none"
  ></button>
  <span v-if="setting">
    <input v-model="storage.tagList[uid].label">
    <input v-model="storage.tagList[uid].value">
    <button @click="storage.tagList[uid] = false">Del</button>
  </span>
</div>
</template>

<script setup lang="ts">
import {storage, appData} from "@/utils";

defineProps<{
  uid: string,
  // item: {
  //   label: String,
  //   value: String,
  //   category: Number,
  //   selected: Boolean
  // }
}>();

const selected = ref(false);
const setting = ref(false);

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
