<template lang="pug">
.poji-prompt
  details(open v-for="(label,category) in appData.category")
    summary.mt-3.mb-2
      h4.d-inline {{ label }}
    .flex
      div(v-for="(item,id) in storage.tagList" v-show="item.category==category")
        Tag(v-if="item.category==category && storage.tagList[id]" :uid="id" :key="id")

      .input-group
        span +
        input.form-control.form-control-sm(type="text" v-model="obj.addDic[category]")
        button.btn.btn-primary.btn-sm(@click="add(category)" :disabled="!obj.addDic[category]") 追加

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
  addDic: <{ [key: string]: string }>{}
})

const add = (category: string | number) => {
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
    //value = value.replace(/\s+/g, '');
    let pow = 1;
    let kagi = false;
    if (value.substring(0, 1) == "(") {
      value = value.match(/\(([^)]+)\)/)![1];
      var split = value.split(":");
      if (split.length > 1) {
        pow = parseFloat(split[1]);
        value = split[0];
      }else{
        value="1.1";
      }
    } else if (value.substring(0, 1) == "<") {
      value = value.match(/<(.*?)>/)![1];
      kagi = true;
      var split = value.split(":");
      if (split.length > 2) {
        pow = parseFloat(split[2]);
        value = split[0] + ":" + split[1];
      }
    }

    let uid = dic[value];
    if (!uid && value) {
      uid = Math.max(...Object.keys(storage.tagList).map(str => parseInt(str))) + 1;
      storage.tagList[uid] = {
        category: 0,
        label: value,
        value: value,
      }
    }
    appData.selects[uid] = {active: true, pow: pow, rate: 0, kagi: kagi}
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
