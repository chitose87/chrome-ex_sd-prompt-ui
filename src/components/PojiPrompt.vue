<template>
<div>
  <details open v-for="(label,category) in appData.category">
    <summary>{{ label }}</summary>
    <div class="flex">
      <div class=""
           v-for="(item,id) in storage.tagList"
           v-show="item.category==category">
        <Tag v-if="item.category==category && storage.tagList[id]" :uid="id" :key="id"></Tag>
      </div>

      <div>
        <span>+</span>
        <input type="text" v-model="obj.addDic[category]">
        <button @click="add(category)" :disabled="!obj.addDic[category]">追加</button>
      </div>
    </div>
  </details>
</div>
</template>

<script setup lang="ts">
// defineProps<{
//   msg: string
// }>()

import {onMounted, reactive, ref, watch, watchEffect} from "vue";
import {appData, storage} from "../utils";
import Tag from "./Tag.vue"

const obj = reactive({
  selected: [],
  addDic: <any>{}
})

const add = (category: string) => {
  let value = obj.addDic[category];

  let uid = Math.max(...Object.keys(storage.tagList).map(str => parseInt(str))) + 1;
  storage.tagList[uid] = {
    category: category,
    label: value,
    value: value
  }
  obj.addDic[category] = "";
}

const click = () => {
}

watchEffect(() => {
  // console.log(appData.form.poji)
  // console.log()
  let arr = appData.form.poji.split(",");

  let dic = <any>{};//valueをdicに
  for (let id in storage.tagList) {
    dic[storage.tagList[id].value] = id;
  }
  arr.forEach((value: string) => {
    let uid = dic[value];
    if (!uid && value) {
      uid = Math.max(...Object.keys(storage.tagList).map(str => parseInt(str))) + 1;
      storage.tagList[uid] = {
        category: 0,
        label: value,
        value: value
      }
    }
    appData.selectList[uid] = true;
  })
})

onMounted(() => {
  // const url = new URL(location.href);
  // robj.poji = url.searchParams.get("poji");
  // robj.nega = url.searchParams.get("nega");
})
</script>

<style scoped>
details {
  margin-top: 0.5rem;
}

.flex {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}
</style>
