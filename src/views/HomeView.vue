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
import {appData, asyncPostMsg} from "../utils";

onMounted(() => {
  window.addEventListener("message", (e) => {
    if (e.data.source === "parent" && e.data.method == "getData") {
    }
  });
  window.parent.postMessage({source: "iframe", method: "getData"}, "*");

  asyncPostMsg("getData")
    .then((data: any) => {
      appData.form.poji = data.poji;
      // appData.form.option = JSON.parse(data.option);
    });
});

watchEffect(() => {
  console.log(appData.form.poji);
  let arr = <any>[];
  for (let id in appData.tagList) {
    let item = appData.tagList[id];
    if (item.selected) {
      arr.push(item.value);
    }
  }

  window.parent.postMessage({
    source: "iframe",
    method: "setData",
    poji: arr.join(","),
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

