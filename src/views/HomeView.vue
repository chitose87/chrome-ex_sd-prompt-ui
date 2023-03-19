<template>
<div class="HomeView">
  <button @click="getData">受け取る</button>
  <button @click="setData">送る</button>
  <hr>
  <PojiPrompt></PojiPrompt>
  <!--  <h2>home</h2>-->
  <!--  <div>-->
  <!--    <input v-model="color" type="color" @update:model-value="changeColor($event)"/>-->
  <!--  </div>-->
</div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import PojiPrompt from "../components/PojiPrompt.vue";
import {appData} from "../utils";

const getData = () => {
  try {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          action: "getData"
        },
        (response: any) => {
          console.log(response.poji);
          appData.form.poji = response.poji;
        }
      );
    });
  } catch (e) {
    appData.form.poji = "all fours,running,skirt lift,sleeping,pixel art,hoge";
  }
}
const setData = () => {
  let arr = <any>[];
  for (let id in appData.tagList) {
    let item = appData.tagList[id];
    if (item.selected) {
      arr[id] = item.value;
    }
  }
  console.log(arr.filter(v => v).join(","));

  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        action: "setData",
        poji: arr.filter(v => v).join(",")
      },
      (response: any) => {
        console.log(response.poji);
      }
    );
  });

}

const color = ref('#000000')

async function changeColor(color: string) {
  // 現在のタブ情報を取得
  const [tab] = await chrome.tabs.query({active: true, currentWindow: true})

  // 開いているタブのbodyの色を変更する
  await chrome.scripting.executeScript({
    target: {tabId: tab.id || 0},
    args: [color],
    func: (args) => {
      document.body.style.background = args
    },
  })
}
</script>

