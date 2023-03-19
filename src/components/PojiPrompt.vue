<template>
<div>
  <details open v-for="(label,category) in appData.category">
    <summary>{{ label }}</summary>
    <div class="flex">
      <div class="" v-for="(item,id) in appData.tagList" v-show="item.category==category">
        <Tag v-if="item.category==category" :id="id"></Tag>
      </div>
    </div>
  </details>
</div>
</template>

<script setup lang="ts">
// defineProps<{
//   msg: string
// }>()

import {onMounted, reactive, watch, watchEffect} from "vue";
import {appData} from "../utils";
import Tag from "./Tag.vue"

const obj = reactive({
  selected: []
})

const click = () => {
}

watchEffect(() => {
  // console.log(appData.form.poji)
  // console.log()
  let arr = appData.form.poji.split(",");
  let dic = <any>{};
  for (let id in appData.tagList) {
    dic[appData.tagList[id].value] = id;
  }
  arr.forEach((value: string) => {
    if (dic[value]) {
      appData.tagList[dic[value]].selected = true;
    } else if (value) {
      appData.tagList[value] = {category: 0, label: value, value: value, selected: true}
    }
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
