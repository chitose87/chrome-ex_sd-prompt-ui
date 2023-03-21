<template>
<div>
  <span>Preset:</span>
  <select v-model="obj.select">
    <option v-for="(item,key) in storage.presets" v-html="key"></option>
  </select>
  <button @click="load">loed</button>
  <span>→</span>

  <input type="text" v-model="obj.name">
  <button @click="save">save</button>
  <button @click="deleate">☓</button>
  <!--  <span>|</span>-->
  <!--  <button @click="fileExport">export</button>-->
  <!--  <button @click="fileImport">import</button>-->
</div>
</template>

<script setup lang="ts">
import {onMounted, reactive, watch, watchEffect} from "vue";
import {appData, asyncPostMsg, storage} from "../utils";

const obj = reactive({
  name: "",
  select: "",
})

const click = () => {
}

onMounted(() => {
})

const load = () => {
  try {
    storage.currentPreset = obj.name = obj.select;
    let preset = storage.presets[storage.currentPreset];
    appData.selectList = preset.selects;
    // 本体に送信
    window.parent.postMessage({
      source: "iframe",
      method: "setOption",
      option: JSON.stringify(preset.option)
    }, "*");

  } catch (e) {
    alert("error" + obj.select);
  }
}
const save = () => {
  console.log("--->save")
  let name = obj.name || "vvv";

  storage.presets[name] = Object.assign(storage.presets[name] || {}, {
    selects: appData.selectList,
  })
  storage.currentPreset = name;

  asyncPostMsg("getData")
    .then((data: any) => {
      console.log("---", data.option)

      storage.presets[name].option = JSON.parse(data.option);
    });
}
const deleate = () => {
  if (confirm(`${obj.name}を削除します`)) {
    delete storage.presets[obj.name];
    storage.currentPreset = "";
  }
}

const fileExport = () => {

}
const fileImport = () => {

}
</script>

<style scoped>
</style>
