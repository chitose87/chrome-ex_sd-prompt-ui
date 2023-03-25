<template>
<div class="greetings" :title="storage.tagList[uid].value">
  <button
    :aria-selected="getSelect(uid).active"
    @click="getSelect(uid).active=!getSelect(uid).active;update()"
    @click.right.prevent="setting=!setting"
    style="user-select: none"
  >
    <span v-if="setting">✓</span>
    <span v-else>
      <span v-if="getSelect(uid).kagi">&lt</span>
      <span v-else-if="getSelect(uid).pow!=1">(</span>
      {{ storage.tagList[uid].label }}
      <span v-if="getSelect(uid).pow!=1">:{{ getSelect(uid).pow }}</span>
      <span v-if="getSelect(uid).kagi">&gt</span>
      <span v-else-if="getSelect(uid).pow!=1">)</span>
      <span v-if="getSelect(uid).rate!=0">↑{{ getSelect(uid).rate }}</span>
    </span>
  </button>
  <span v-if="setting">
    <input v-model="storage.tagList[uid].label">
    <input v-model="storage.tagList[uid].value">
    <span>:</span><input v-model="getSelect(uid).pow" type="number" placeholder="1" style="width: 2.5em"
                         @change="update">
    <span>↑</span><input v-model="getSelect(uid).rate" type="number" placeholder="0" style="width: 2.5em"
                         @change="update">
    <!--    <button @click=" getSelect(uid)=false">Del</button>-->
  </span>
</div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref, watch, watchEffect} from "vue";
import {appData, storage} from "../utils";

defineProps<{
  uid: string,
}>();

const selected = ref(false);
const setting = ref(false);

const getSelect = (id: string) => {
  if (!appData.selects[id]) appData.selects[id] = {active: false, pow: 1, rate: 0};
  return appData.selects[id];
}

const update = () => {
  //@ts-ignore reactiveを反応させるためだけ
  appData.selects.time = +new Date();
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
