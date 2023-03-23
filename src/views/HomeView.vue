<template>
<div class="HomeView">
  <button @click="refreash">refreash</button>
  <!--    <button @click="getData">受け取る</button>-->
  <!--  <button @click="setData">送る</button>-->
  <!--  <hr>-->
  <Preset></Preset>
  <PojiPrompt></PojiPrompt>
  <!--  <h2>home</h2>-->
  <!--  <div>-->
  <!--    <input v-model="color" type="color" @update:model-value="changeColor($event)"/>-->
  <!--  </div>-->
</div>
</template>

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

watchEffect(() => {
  console.log("appData.selects");

  let arr = <any>[];
  for (let id in appData.selects) {
    let state = appData.selects[id];
    let tag = storage.tagList[id]
    if (state.active && tag) {
      // arr.push(tag);
      arr.push({
        value:
          (state.pow != 1 ? "(" : "") +
          tag.value +
          (state.pow != 1 ? `:${state.pow})` : ""),
        rate: (state.rate || 0) + (state.pow / 100)
      });
    }
  }
  arr.sort((a: any, b: any) => {
    return b.rate - a.rate;
  });
  let strArr = <string[]>[];
  arr.forEach((item: any) => {
    strArr.push(item.value);
  });

  console.log(strArr.join(","));

  window.parent.postMessage({
    source: "iframe",
    method: "setData",
    poji: strArr.join(","),
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
</script>

