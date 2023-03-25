<template lang="pug">
.HomeView
  button.btn.btn-primary.btn-sm(@click="refreash") 現在値を取り込む
  button.btn.btn-primary.btn-sm(@click="resetLS") clear tagList

  Preset
  PojiPrompt
</template>

<style lang="scss">
//@import "bootstrap";
</style>

<script setup lang="ts">
import {onMounted, ref, watchEffect} from 'vue'
import PojiPrompt from "../components/PojiPrompt.vue";
import Preset from "../components/Preset.vue";
import {appData, asyncPostMsg, storage} from "../utils";

onMounted(() => {
  asyncPostMsg("getData")
    .then((data: any) => {
      appData.form.poji = data.poji;
      // appData.form.option = JSON.parse(data.option);
    });
});

//メインの反映ロジック
watchEffect(() => {
  console.log("appData.selects");

  let arr = <any>[];
  let rola=<any>[];
  for (let id in appData.selects) {
    let state = appData.selects[id];
    let tag = storage.tagList[id]
    if (state.active && tag) {
      // arr.push(tag);
      if (state.kagi) {
        rola.push(`<${tag.value}:${state.pow}>`)
      } else {
        arr.push({
          value:
            (state.pow != 1 ? "(" : "") +
            tag.value +
            (state.pow != 1 ? `:${state.pow})` : ""),
          rate: (state.rate || 0) + (state.pow / 100)
        });
      }
    }
  }
  arr.sort((a: any, b: any) => {
    return b.rate - a.rate;
  });
  let strArr = <string[]>[];
  arr.forEach((item: any) => {
    strArr.push(item.value);
  });

  // console.log(strArr.join(","));

  window.parent.postMessage({
    source: "iframe",
    method: "setData",
    poji: rola.join(" ")+" "+strArr.join(","),
    // option: JSON.stringify(appData.form.option)
  }, "*");
})

const refreash = () => {
  asyncPostMsg("getData")
    .then((data: any) => {
      appData.form.poji = data.poji;
      // appData.form.option = JSON.parse(data.option);
    });
}

const batch = () => {
  asyncPostMsg("batch");
}

const resetLS = () => {
  localStorage.setItem("system",
    JSON.stringify(
      Object.assign(JSON.parse(localStorage.getItem("system") || "{}"),
        {tagList: {}})
    ))
}
</script>

