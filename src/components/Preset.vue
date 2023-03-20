<template>
<div>
  <span>Preset:</span>
  <select v-model="obj.select">
    <option v-for="(item,key) in obj.option.list" v-html="key"></option>
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
import {appData} from "../utils";

const obj = reactive({
  name: "",
  select: "",
  option: {
    current: "",
    list: <any>{},
  }
})

const click = () => {
}

onMounted(() => {
  try {
    obj.option = JSON.parse(localStorage.getItem("option") || "")
  } catch (e) {
  }
  if (!obj.option.list) obj.option.list = {};
  obj.select = obj.option.current;
})

const load = () => {
  try {
    let data = JSON.parse(localStorage.getItem(obj.select) || "");
    obj.name = obj.select;

    appData.tagList = data.tagList;
  } catch (e) {
    alert("error" + obj.select);
  }
}
const save = () => {
  let name = obj.name || "vvv";
  localStorage.setItem(name, JSON.stringify({
    tagList: appData.tagList
  }));
  obj.option.list[name] = 1;
  obj.option.current = name;
  localStorage.setItem("option", JSON.stringify(obj.option));
}
const deleate = () => {
  if (confirm(`${obj.name}を削除します`)) {
    localStorage.removeItem(obj.name);

    delete obj.option.list[obj.name]
    if (obj.option.current == obj.name) obj.option.current = "";
    localStorage.setItem("option", JSON.stringify(obj.option));
    obj.name = "";
  }
}

const fileExport = () => {

}
const fileImport = () => {

}
</script>

<style scoped>
</style>
